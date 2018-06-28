const cacheName = 'mws-v1';
const filesToCache = [
  '/',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  'index.html',
  'restaurant.html',
  './css/styles.css',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cachesList => cachesList
        .filter(cache => cache !== cacheName)
        .map(foundCache => caches.delete(foundCache))
      )
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(error => console.log(error))
  )
});