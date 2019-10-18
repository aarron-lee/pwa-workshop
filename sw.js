importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log('workbox is loaded');

  workbox.routing.registerRoute(
    /* regex to decide which requests to intercept */
    new RegExp('^https://newsapi.org'),
    new workbox.strategies.CacheFirst({
      /* cache to check/save responses to*/
      cacheName: 'api-cache',
      /* note which responses are cacheable*/
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    new RegExp('^https://storage.googleapis.com/'),
    new workbox.strategies.CacheFirst({
      cacheName: 'workbox-sw-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );

  workbox.routing.registerRoute(/\.(?:js|css|html)$/, new workbox.strategies.CacheFirst());

  workbox.routing.registerRoute(/\.(?:png|gif|jpg)$/, new workbox.strategies.CacheFirst());
}
