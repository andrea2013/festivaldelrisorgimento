# festivaldelrisorgimento.org

Sito del Festival del Risorgimento di Forlì. Mappa interattiva e programma degli eventi.

Sono file statici: niente database, niente server da mantenere, nessun costo di hosting.

## Struttura

```
/                       → rimanda all'edizione corrente
/2026/                  → l'edizione 2026 (mappa + programma)
  index.html            struttura della pagina
  app.css               stile
  app.js                logica: mappa, filtri, schede
  programma.js          ← I DATI DEGLI EVENTI. È l'unico file da toccare per gli orari.
  planimetria.jpg       la mappa del centro storico
  sw.js                 fa funzionare l'app senza rete
  manifest.webmanifest  permette "Aggiungi a schermata Home"
  icone/                icone e immagine di anteprima per i social
vercel.json             redirect e cache
```

Ogni anno si aggiunge una cartella nuova (`/2027/`) e si aggiorna il rimando nella home.
Le edizioni passate restano online al loro indirizzo: diventano l'archivio del Festival.

## Metterlo online la prima volta

1. **GitHub** — crea un repository e carica questa cartella.
2. **Vercel** — vai su vercel.com, accedi con GitHub, *Add New → Project*, scegli il repository e conferma. Non serve configurare nulla: Vercel riconosce che è un sito statico. In meno di un minuto hai un indirizzo di prova tipo `festival-abc123.vercel.app`.
3. **Dominio** — nel progetto Vercel, *Settings → Domains*, aggiungi `festivaldelrisorgimento.org` e `www.festivaldelrisorgimento.org`.
4. **DNS su GoDaddy** — Vercel mostra i record esatti da inserire nella scheda del dominio. Copiali da lì: un record **A** per il dominio nudo e un **CNAME** per `www`. Non usare valori trovati altrove, perché Vercel assegna indirizzi diversi a progetti diversi e la verifica controlla proprio quelli che ti ha dato.
5. Attendi la propagazione (di solito minuti, al massimo qualche ora). Il certificato HTTPS viene emesso da solo.

### Il dominio .it

Aggiungi anche `festivaldelrisorgimento.it` nello stesso progetto Vercel e impostalo come *Redirect* verso il `.org`. Così chi digita l'uno finisce sull'altro e non ci sono due siti da tenere allineati.

### forlirisorge.it

Resta il sito istituzionale. Basta aggiungere in home un pulsante ben visibile verso
`https://www.festivaldelrisorgimento.org/2026/`

## Aggiornare orari, luoghi o eventi

Si modifica **solo** `2026/programma.js`. Ogni evento è una voce con questa forma:

```js
{
  id:"conc1",                    // identificativo, deve essere unico
  p:4,                           // numero del punto sulla planimetria (1-13)
  cat:"concerto",                // convegno | mostra | rievocazione | concerto | famiglie | servizio
  t:"Concerto verdiano",         // titolo
  sub:"Musiche di Giuseppe Verdi",
  luogo:"ex Chiesa di San Giacomo",
  indir:"presso il Museo San Domenico",
  mapq:"Musei San Domenico Forlì",   // testo cercato da "Portami qui" su Google Maps
  occ:[{d:19, s:"21:00", e:"23:00"}],// d = giorno di settembre, s = inizio, e = fine
  det:[["Interpreti","Soprano Antonella Orefice"]]   // righe della scheda, facoltative
}
```

Un evento che si ripete ha più voci in `occ`. Un evento senza orario di fine lascia `e:""`.

Dopo la modifica:

1. Salva il file su GitHub (anche dall'interfaccia web, con il pulsante di modifica).
2. **Aumenta la versione in `2026/sw.js`**: `festival-2026-v1` → `festival-2026-v2`. Senza questo passaggio i telefoni che hanno già aperto l'app continuano a mostrare il programma vecchio, salvato in memoria.
3. Vercel pubblica da solo entro un minuto.

## Spostare la mappa dei punti

Le posizioni sono in fondo a `programma.js`, nell'oggetto `PUNTI`: per ogni numero ci sono
due valori in percentuale, orizzontale e verticale, riferiti all'immagine della planimetria.
`1:[65.6, 55.8]` significa "al 65,6% da sinistra e al 55,8% dall'alto".

## Da completare

- Posizioni di parcheggi, bagni pubblici e stazione, da aggiungere come punti di servizio.
- Antichi mestieri: il programma li indica solo sabato 19, la legenda della planimetria dice 19-20. Da confermare.
- QR per singola postazione, percorso consigliato, versione inglese, prenotazione posti.
