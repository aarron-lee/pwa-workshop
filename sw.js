console.log('I AM A SERVICE WORKER');

const CACHE_NAME = 'CACHE_NAME_V1';

const CACHED_FILES = ['/', '/index.html', '/index.css', '/index.js'];

self.addEventListener('install', function(event) {
  console.log('SERVICE WORKER INSTALLED');
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_FILES)));
});
