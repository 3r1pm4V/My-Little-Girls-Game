const C="bhv-v15",CORE=["./","index.html","app.js","data-vn.js","stories-data.js","stories-catalog.js","audio-map.js","img-core.js","font-vn.ttf","font-tapviet.ttf","font-tapviet-cham.ttf","manifest.webmanifest","icon-192.png","icon-512.png"],LAZY=["img-s.js","img-o.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE).then(()=>Promise.allSettled(LAZY.map(u=>c.add(u))))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 e.respondWith(caches.match(r,{ignoreSearch:r.mode==="navigate"}).then(h=>h||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>r.mode==="navigate"?caches.match("index.html"):Response.error())))});
