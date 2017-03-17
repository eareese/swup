const lh = '[sw]: '
var version = 'v2::'

var offlineAssets = serviceWorkerOption.assets

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(`${version}funs`)
      .then(function (cache) {
        return cache.addAll(offlineAssets)
      })
  )
})

self.addEventListener('fetch', function(event) {
  console.log(`${lh}fetch in progress...`)

  if (event.request.method !== 'GET') {
    console.log(`${lh}fetch ignored.`)
    return
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(function(cached) {
        let networked = fetch(event.request)
            .then(fetchedFromNetwork, unableToResolve)
            .catch(unableToResolve)

        return cached || networked

        function fetchedFromNetwork(response) {
          let cacheCopy = response.cone();
          caches
            .open(`${version}pages`)
            .then(function add(cache) {
              cache.put(event.request, cacheCopy)
            })
            .then(function() {
              console.log(`${lh}fetch stored`)
            })
          return response
        }

        function unableToResolve() {
          console.log(`${lh}fetch failed`)
          return new Response('<h1>Service unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          })
        }
      }))
})

self.addEventListener('activate', function activator (event) {
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
