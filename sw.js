// sw.js — minimal PWA service worker for GitHub Pages
const CACHE_NAME = 'friction-pwa-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './friction_icon-192.png',
  './friction_icon-512.png',
  './friction_apple-touch-icon.png',
  './sunmoon_logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Only handle GET
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        // Cache successful same-origin responses
        try{
          const url = new URL(req.url);
          if (url.origin === self.location.origin && resp.status === 200 && resp.type === 'basic') {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
        }catch(e){}
        return resp;
      }).catch(() => caches.match('./'));
    })
  );
});
