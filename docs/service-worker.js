(()=>{let a=[],n="";a=["index.html","android-icon-192x192.a9beedbe.png","favicon-32x32.6c82a014.png","favicon-96x96.e83e89ba.png","manifest.webmanifest","index.7853027d.css","index.6e62071d.js"],n="00c19ff4",addEventListener("install",(e=>e.waitUntil(async function(){const e=await caches.open(n);await e.addAll(a)}()))),addEventListener("activate",(a=>a.waitUntil(async function(){const a=await caches.keys();await Promise.all(a.map((a=>a!==n&&caches.delete(a))))}())))})();
//# sourceMappingURL=service-worker.js.map
