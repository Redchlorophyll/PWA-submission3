importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log("workbox berhasil dimuat");
} else {
  console.log("workbox gagal dimuat");
}


//precaching
workbox.precaching.precacheAndRoute([
  {url : '/index.html', revision: '1'},
  {url : '/jadwal_view.html', revision: '1'},
  {url : '/nav.html', revision: '1'},
  {url : '/manifest.json', revision: '1'},
  {url : '/register.js', revision: '1'},
  {url : "/css/materialize.min.css", revision: '1'},
  {url : "/css/card.css", revision: '1'},
  {url : "/js/materialize.min.js", revision: '1'},
  {url : "/js/nav.js", revision: '1'},
  {url : "/js/api.js", revision: '1'},
  {url : "/js/idb.js", revision: '1'},
  {url : "/js/db.js", revision: '1'},
]);

//register all logo in logos folder with cachefirst strategies
workbox.routing.registerRoute(
  new RegExp('/logos/'),
workbox.strategies.cacheFirst({
    cacheName: 'futbalmania-logos',
  })
);


//register all image in img folder with cachefirst strategiest
workbox.routing.registerRoute(
    new RegExp('/img/'),
workbox.strategies.cacheFirst({
  cacheName: 'futballmania-img',
})
)

//register materialize font stylesheets using staleWhileRevalidate strategies
workbox.routing.registerRoute(
  "https://fonts.googleapis.com/icon?family=Material+Icons",
workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

//register icon using cachefirst
workbox.routing.registerRoute(
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
workbox.strategies.cacheFirst({
  cacheName: 'materialize-icons', //cache name
  plugins: [
    new workbox.cacheableResponse.Plugin({
      statuses: [0, 200],
    }),
    new workbox.expiration.Plugin({
      maxAgeSeconds: 365 * 24 * 60 * 60,
      maxEntries: 60,
    }),
  ],
})
);

//register all file in pages folder using staleWhileRevalidate strategies
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
)

//register api using staleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
workbox.strategies.staleWhileRevalidate({
  cacheName: 'football-data.org',
})
)
