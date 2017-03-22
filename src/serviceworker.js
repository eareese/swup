let version = 'v4::',
    offlineAssets = serviceWorkerOption.assets

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(`${version}myAppCache`)
      .then(function (cache) {
        console.log(`[SW] installed`)
        return cache.addAll(offlineAssets)
      })
  )
})

/* delete everything from other version caches */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
                         .filter(function (key) {
                           return !key.startsWith(version)
                         })
                         .map(function (key) {
                           return caches.delete(key)
                         })
                        )
    })
  )
})
