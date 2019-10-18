console.log('I AM A SERVICE WORKER');

const CACHE_NAME = 'CACHE_NAME_V1';

const CACHED_FILES = ['/', '/index.html', '/index.css', '/index.js'];

self.addEventListener('install', function(event) {
  console.log('SERVICE WORKER INSTALLED');
  /* underneath the hood, cache.addAll caches the actual files */
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_FILES)));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        /* the response is undefined if it isn't in the cache
         the || will fall back to the actual fetch event
        */
        return (
          response ||
          fetch(event.request).then(response => {
            /* if the response was successful, then cache it with cache.put(key, value) */
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
          })
        );
      });
    })
  );
});
