importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Cache routes...
registerRoute(
// Check to see if the request is a navigation to a new page...
({ request }) => request.destination === 'image' || request.destination === 'index.js'|| request.destination === 'index.html'|| request.destination === 'styles.css'|| request.destination === 'icons',
// Use a Network First caching strategy...
 new NetworkFirst({
   // Put all cached files in a cache named 'pages'...
   cacheName: 'pages',
   plugins: [
      // Ensure that only requests that result in a 200 status are cached...
      new CacheableResponsePlugin({
         statuses: [200]
      }),
      new ExpirationPlugin({
         maxEntries: 20,
         maxAgeSeconds: 7 * 24 * 60 * 60 // 1 Day
      }),
   ],
 })
);