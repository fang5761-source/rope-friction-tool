// 透過更新這裡的版本號，來通知手機端有新版本需要下載
const VERSION = "5.11.1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// 保持最小化：不預快取、不攔截 fetch，讓內容仍以網路最新版為主。
self.addEventListener("fetch", () => {});