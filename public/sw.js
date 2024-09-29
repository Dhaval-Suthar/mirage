const CACHE_NAME = 'video-cache-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/processed/')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    return (
                        response ||
                        fetch(event.request).then((newResponse) => {
                            cache.put(event.request, newResponse.clone());
                            return newResponse;
                        })
                    );
                });
            })
        );
    }
});
