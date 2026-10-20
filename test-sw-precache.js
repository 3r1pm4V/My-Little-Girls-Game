/**
 * test-sw-precache.js — kiểm tra precache của sw.js (task P0-13 + P2-07).
 * Chạy:   node test-sw-precache.js          (kiểm tra)
 *         node test-sw-precache.js --fix    (tự bump version + cập nhật asset-hash trong sw.js)
 * Không phụ thuộc gói ngoài, không cần build.
 */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = __dirname, FIX = process.argv.includes("--fix");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const exists = f => fs.existsSync(path.join(ROOT, f));
const TEXT = /\.(js|html|css|json|webmanifest|svg)$/i;

let failed = 0;
const fail = m => { failed++; console.error("  ✖ " + m); };
const warn = m => console.warn("  ⚠ " + m);
const ok = m => console.log("  ✔ " + m);

// --- đọc sw.js ---
const sw = read("sw.js");
const ver = (sw.match(/const C\s*=\s*"bhv-v(\d+)"/) || [])[1];
const list = name => {
  const m = sw.match(new RegExp("const " + name + "\\s*=\\s*\\[([\\s\\S]*?)\\]"));
  return m ? [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]) : null;
};
const CORE = list("CORE"), OPT = list("OPT"), OPT_AUDIO = list("OPT_AUDIO") || [];
const storedHash = (sw.match(/asset-hash:\s*([0-9a-f]+)/) || [])[1];

console.log("sw.js precache");
if (!ver) fail('không đọc được `const C = "bhv-vNN"`');
if (!CORE) fail("không đọc được CORE");
if (!OPT) fail("không đọc được OPT");
if (!CORE || !OPT) { console.error("\nFAIL"); process.exit(1); }

const norm = f => (f === "./" ? "index.html" : f);
const coreSet = new Set(CORE.map(norm)), optSet = new Set(OPT.map(norm)), audioSet = new Set(OPT_AUDIO.map(norm));

// 1) không trùng lặp
const all = [...CORE, ...OPT, ...OPT_AUDIO]; // so thô: "./" và "index.html" là 2 khóa cache khác nhau, cố ý có cả hai
const dup = all.filter((f, i) => all.indexOf(f) !== i);
dup.length ? fail("trùng trong CORE/OPT/OPT_AUDIO: " + [...new Set(dup)].join(", ")) : ok("CORE/OPT/OPT_AUDIO không trùng");

// 2) file tồn tại
[...new Set(CORE.map(norm))].forEach(f => { if (!exists(f)) fail(`CORE thiếu file trên đĩa: ${f} (thiếu 1 file là SW không cài được)`); });
OPT.forEach(f => { if (!exists(f)) warn(`OPT không có trên đĩa: ${f}`); });
if (!failed) ok("mọi file CORE đều tồn tại");

// 3) mọi tài nguyên local index.html nạp phải nằm trong CORE
const html = read("index.html");
const refs = [...html.matchAll(/<(?:script|link|img)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi)].map(m => m[1]);
const local = refs.filter(u => !/^(https?:)?\/\//i.test(u) && !/^(data:|#)/.test(u)).map(u => u.split(/[?#]/)[0]);
const missing = [...new Set(local)].filter(u => !coreSet.has(u));
missing.length ? fail("index.html nạp nhưng CORE thiếu: " + missing.join(", ")) : ok(`index.html: ${new Set(local).size} tài nguyên local đều trong CORE`);

// 4) import()/LAZY động trong app.js phải nằm trong CORE hoặc OPT
const app = read("app.js");
const dyn = new Set([
  ...[...app.matchAll(/import\(\s*['"]\.\/([^'"]+)['"]\s*\)/g)].map(m => m[1]),
  ...[...((app.match(/LAZY\s*=\s*\{([^}]*)\}/) || [, ""])[1]).matchAll(/["']\.\/([^"']+)["']/g)].map(m => m[1])
]);
const dynMissing = [...dyn].filter(f => !coreSet.has(f) && !optSet.has(f));
dynMissing.length ? fail("app.js nạp động nhưng không precache: " + dynMissing.join(", ")) : ok(`app.js: ${dyn.size} file nạp động đều được precache`);

// 5) cảnh báo (chưa thuộc task này)
if (refs.some(u => /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u))) warn("index.html còn nạp Google Fonts (offline phụ thuộc cache động) → P2-03");

// 6) asset-hash: ép bump version khi asset đổi
const files = [...new Set([...coreSet, ...optSet, ...audioSet])].filter(exists).sort();
const h = crypto.createHash("sha256");
for (const f of files) {
  let b = fs.readFileSync(path.join(ROOT, f));
  if (TEXT.test(f)) b = Buffer.from(b.toString("utf8").replace(/\r\n/g, "\n")); // CRLF (Windows) ≠ LF (CI)
  h.update(f + "\0").update(b);
}
const hash = h.digest("hex").slice(0, 16);
if (storedHash === hash) ok(`asset-hash khớp (${hash}), version bhv-v${ver}`);
else if (FIX) {
  if (failed) { console.error("  Không --fix khi còn lỗi ở trên."); }
  else {
    const next = storedHash && /^0+$/.test(storedHash) ? ver : String(+ver + 1); // lần đầu chỉ ghi hash
    const out = sw.replace(/asset-hash:\s*[0-9a-f]+/, "asset-hash: " + hash).replace(/const C\s*=\s*"bhv-v\d+"/, `const C = "bhv-v${next}"`);
    fs.writeFileSync(path.join(ROOT, "sw.js"), out);
    console.log(`  ↻ đã cập nhật sw.js: bhv-v${ver} → bhv-v${next}, asset-hash ${hash}`);
  }
} else fail(`asset-hash lệch (sw.js: ${storedHash}, thực tế: ${hash}) — asset đã đổi mà chưa bump cache. Chạy: node test-sw-precache.js --fix`);

console.log(failed ? `\nFAIL (${failed} lỗi)` : "\nPASS");
process.exit(failed ? 1 : 0);
