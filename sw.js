const CACHE_VERSION = 'v4';
const CACHE_NAME = `traitors-${CACHE_VERSION}`;
const urlsToCache = [
  './',
  './index.html',
  './icon.svg',
  './apple-touch-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', responseClone));
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match('./index.html');
          return cachedResponse || Response.error();
        })
    );
    return;
  }

  if (requestURL.origin !== self.location.origin) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});