const CACHE_NAME = 'studiosyx-cache-v1';

const ASSETS = [
  '/studiosyx/',
  '/studiosyx/index.html',
  '/studiosyx/manifest.webmanifest',
  '/studiosyx/style.css',
  '/studiosyx/script.js'
];

// cache des vidéos si tu veux offline total
// ajoute ici tes vidéos plus tard
// ex : '/studiosyx/videos/video1.mp4'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
