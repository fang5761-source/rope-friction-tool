// sw.js - 最小可用版（目標：讓 Chrome 允許「安裝應用程式」）
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// 先不做快取，避免你開發時一直被舊檔卡住
self.addEventListener("fetch", (event) => {
  // pass-through：讓所有請求照正常網路走
});
