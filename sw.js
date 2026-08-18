const CACHE = 'croma-calendario-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/croma-ds.css',
  '/croma-icons.js',
  '/croma-session.js',
  '/avisos.css',
  '/avisos.js',
  '/avisos-repository.js',
  '/avisos-provider.js',
  '/avisos-provider-avisos-strategy.js',
  '/tridente_solo.png',
  '/favicon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first, cache fallback
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
