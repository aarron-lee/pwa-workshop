console.log('I AM A SERVICE WORKER');

const CACHE_NAME = 'CACHE_NAME_V1';

const CACHED_FILES = ['/', '/index.html', '/index.css', '/index.js'];

self.addEventListener('install', function(event) {
  console.log('SERVICE WORKER INSTALLED');
  /* underneat the hood, cache.addAll caches the actual files */
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_FILES)));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request);
    })
  );
});
