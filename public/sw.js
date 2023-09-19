const CACHE_STATIC = 'static-cache-v1';
const CACHE_DYNAMIC = 'dynamic-cache-v1';

const files = [
    './',
    './sw.js',
    './favicon.ico',
    './manifest.json',
    './logo.svg',
    './registerSW.js',
];

self.addEventListener('install', async event => {
    async function cacheStaticFiles () {
        const cacheStat = await caches.open(CACHE_STATIC);
        await cacheStat.addAll(files)
    }

    event.waitUntil(cacheStaticFiles())
})

self.addEventListener('fetch', async event => {
    const url = new URL(event.request.url)
    if (url.origin === location.origin) {
        event.respondWith(getFromCache(event.request))
    } else {
        event.respondWith(getFromNetwork(event.request))
    }
})

async function getFromCache (request) {
    const cache = await caches.open(CACHE_STATIC);
    const cachedResponse = await cache.match(request);
    return cachedResponse ?? await fetch(request)
}

async function getFromNetwork (request) {
    const cache = await caches.open(CACHE_DYNAMIC)
    try {
        const resp = await fetch(request)
        await cache.put(request, resp.clone())
        return resp
    } catch (error) {
        return await cache.match(request)
    }
}
