self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// 保持最小化：不預快取、不攔截 fetch，讓內容仍以網路最新版為主。
self.addEventListener("fetch", () => {});
