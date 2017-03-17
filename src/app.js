import runtime from 'serviceworker-webpack-plugin/lib/runtime'

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
  // navigator.serviceWorker.register('serviceworker.js', {
  //   scope: '.'
  // })
  //   .then(function(reg) {
  //     /* now the ServiceWorker is registered and ready for use */
  //   });
}
