/* Service worker — fa funzionare l'app anche senza rete.
   IMPORTANTE: quando aggiorni il programma, cambia il numero di VERSIONE
   qui sotto (es. da v1 a v2), altrimenti i telefoni continuano a mostrare
   la copia vecchia salvata in cache. */
const VERSIONE = "festival-2026-v2";

const FILE = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./programma.js",
  "./planimetria.jpg",
  "./manifest.webmanifest",
  "./icone/icona-192.png",
  "./icone/icona-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSIONE)
      .then(c => c.addAll(FILE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== VERSIONE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Risorse esterne (font Google): rete, con la cache come riserva.
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(req).then(r => {
        const copia = r.clone();
        caches.open(VERSIONE).then(c => c.put(req, copia));
        return r;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // File dell'app: prima la cache (istantanea), poi si aggiorna in background.
  e.respondWith(
    caches.match(req).then(salvato => {
      const dallaRete = fetch(req).then(r => {
        const copia = r.clone();
        caches.open(VERSIONE).then(c => c.put(req, copia));
        return r;
      }).catch(() => salvato || caches.match("./index.html"));
      return salvato || dallaRete;
    })
  );
});
