var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/images/my-image.jpg',
  // Add other URLs to cache here
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
