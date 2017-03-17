var offlines = [
  '/'
]

var specialOfflines = serviceWorkerOption.assets

self.addEventListener('install', function installer (event) {
  event.waitUntil(
    caches
      .open('v1::funs')
      .then(function prefill (cache) {
        return cache.addAll(specialOfflines)
      })
  )
})
