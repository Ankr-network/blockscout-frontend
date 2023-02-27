(function () {
  const ENDPOINTS = [
    '/api/v1/blockchain',
    '/api/v1/blockchain/detail',
    '/api/v1/stats/all/30d',
    '/api/v1/stats/bsc/30d',
    '/api/v1/stats/fantom/30d',
    '/api/v1/stats/polygon/30d',
  ];

  const checkEndpoint = url => {
    return ENDPOINTS.some(endpoint => url.includes(endpoint));
  };

  const CACHE_NAME = 'rpc';

  // Cache and return the requests
  self.addEventListener('fetch', event => {
    const hasEndpoint = checkEndpoint(event.request.url);

    if (!hasEndpoint) return;

    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          });

          return response || fetchPromise;
        });
      })
    );
  });
})();
