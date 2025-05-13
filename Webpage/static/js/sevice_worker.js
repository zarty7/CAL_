if ('serviceWorker' in navigator) {
     window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(error) {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}
// sw.js
self.addEventListener('install', function(event) {
    console.log('ServiceWorker installed:', event);
});

self.addEventListener('activate', function(event) {
    console.log('ServiceWorker activated:', event);
});