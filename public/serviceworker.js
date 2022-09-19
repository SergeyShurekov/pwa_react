const CACH_NAME = "version-1";
const urlsToCach = ['index.html', 'offLine.html'];

const self = this;

// установка
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACH_NAME)
      .then((cache) => {
        console.log('Открыт кэш!')
        return cache.addAll(urlsToCach);
      })
  )
});

// ожидание запроса
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => caches.match('offLine.html'))
      })
  )
});
// запуск
self.addEventListener('activate', (event) => {
  const catcheWhiteList = [];
  catcheWhiteList.push(CACH_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!catcheWhiteList.includes(cacheName))
          return caches.delete(cacheName);
      })
    ))
  )
});