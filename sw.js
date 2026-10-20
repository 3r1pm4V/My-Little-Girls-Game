// asset-hash: 9f284c478559f835
// ↑ do `node test-sw-precache.js --fix` sinh ra; đừng sửa tay. Đổi bất kỳ file trong CORE/OPT mà chưa chạy --fix thì test sẽ ĐỎ.
const C = "bhv-v45";

// Bắt buộc: thiếu 1 file là cài SW thất bại (addAll atomic) → test-sw-precache.js kiểm tra đủ & tồn tại.
const CORE = [
  "./", "index.html", "styles.css", "bg.webp",
  "app.js", "data-vn.js", "activities-data.js", "audio-map.js", "img-core.js",
  "font-vn.ttf", "font-tapviet.ttf", "font-tapviet-cham.ttf",
  "fonts/baloo2-600.woff2", "fonts/baloo2-800.woff2",
  "manifest.webmanifest", "icon-192.png", "icon-512.png"
];

// Nạp lười bằng import() trong app.js: tải cố gắng hết sức lúc cài, thiếu file KHÔNG làm hỏng việc cài SW.
const OPT = ["stories-data.js", "stories-catalog.js", "img-s.js", "img-o.js"];

function shouldCache(req, res) {
  if (!res) return false;
  const u = new URL(req.url);
  return u.origin === self.location.origin && res.ok;
}

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(C)
      .then(async c => {
        await c.addAll(CORE);
        await Promise.all(OPT.map(u => c.add(u).catch(() => {})));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  e.respondWith(
    caches.match(r, { ignoreSearch: r.mode === "navigate" }).then(hit =>
      hit ||
      fetch(r)
        .then(res => {
          if (shouldCache(r, res)) {
            const cp = res.clone();
            caches.open(C).then(c => c.put(r, cp));
          }
          return res;
        })
        .catch(() => (r.mode === "navigate" ? caches.match("index.html") : Response.error()))
    )
  );
});
