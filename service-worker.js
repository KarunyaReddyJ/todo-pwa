const CACHE_NAME = 'todo-pwa-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './more-apps-icon-0.jpg'
];

// Install event: Cache the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetch event: Serve cached assets if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
