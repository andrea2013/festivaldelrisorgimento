// Programma Festival del Risorgimento 2026 — dati estratti dalle grafiche ufficiali
// p = punto sulla planimetria (1-13). occ = occorrenze {d: giorno di settembre, s: inizio, e: fine}
const EVENTI = [
 {id:"conv1", p:7, cat:"convegno", t:"«Il Risorgimento: una storia ancora tutta da riscoprire»",
  sub:"Convegno di apertura del Festival",
  luogo:"Sala Randi del Comune di Forlì", indir:"Entrata da Via delle Torri",
  mapq:"Sala Randi Comune di Forlì Via delle Torri",
  occ:[{d:11,s:"20:00",e:"23:00"}],
  det:[["Introduce","Dott. Maurizio Casadei — Presidente regionale ANVRG"],
       ["Relatori","Prof. Marco Boniardi — Docente al Politecnico di Milano\nProf. Andrea Sirotti Gaudenzi — Docente e saggista\nProf. Giorgio Sangiorgi — Storico del cinema"],
       ["Coordina","Dott. Simone Valmori — Scrittore"]]},

 {id:"most-in", p:9, cat:"mostra", t:"Inaugurazione della mostra «Res Publica»",
  sub:"Visioni Contemporanee del Risorgimento Italiano",
  luogo:"Palazzo del Podestà", indir:"Piazza Saffi",
  mapq:"Palazzo del Podestà Piazza Saffi Forlì",
  occ:[{d:12,s:"17:30",e:""}], det:[]},

 {id:"mostra", p:9, cat:"mostra", t:"Mostra «Res Publica»",
  sub:"Visioni Contemporanee del Risorgimento Italiano",
  luogo:"Palazzo del Podestà", indir:"Piazza Saffi + Piazzetta della Pescheria (Corso Diaz)",
  mapq:"Palazzo del Podestà Piazza Saffi Forlì",
  occ:[{d:13,s:"15:30",e:"19:00"},{d:15,s:"15:30",e:"19:00"},{d:16,s:"15:30",e:"19:00"},
       {d:17,s:"15:30",e:"19:00"},{d:18,s:"10:00",e:"19:30"},{d:19,s:"10:00",e:"19:30"},
       {d:20,s:"10:00",e:"19:30"},{d:22,s:"15:30",e:"19:00"},{d:23,s:"15:30",e:"19:00"},
       {d:24,s:"15:30",e:"19:00"},{d:25,s:"15:30",e:"19:00"},{d:26,s:"15:30",e:"19:00"},
       {d:27,s:"15:30",e:"19:00"}],
  det:[["Orari","Martedì–domenica 15:30 – 19:00\nVenerdì 18, sabato 19 e domenica 20: 10:00 – 19:30\nChiuso il lunedì"],
       ["Periodo","Dal 12 al 27 settembre 2026"]]},

 {id:"conv2", p:8, cat:"convegno", t:"«Oltre la camicia rossa: i valori garibaldini nel XXI secolo»",
  sub:"Seconda serata di convegni",
  luogo:"Salone del Palazzo del Comune", indir:"Piazza Saffi",
  mapq:"Palazzo Comunale Piazza Saffi Forlì",
  occ:[{d:18,s:"20:00",e:"23:00"}],
  det:[["Introduce","Dott. Maurizio Casadei — Presidente regionale ANVRG"],
       ["Relatori","Prof. Aldo Alessandro Mola — Storico\nProf. Davide Gnola — Scrittore e direttore del Museo della Marineria di Cesenatico\nDott. Mario De Simone — Notaio"],
       ["Coordina","Dott. Paolo Morelli — Giornalista, Direttore Responsabile de «La Voce Repubblicana»"]]},

 {id:"ristoro", p:12, cat:"cucina", t:"Cucina risorgimentale e romagnola",
  sub:"Aree ristoro del Festival",
  luogo:"Piazza Saffi", indir:"Lato Palazzo del Podestà",
  mapq:"Piazza Aurelio Saffi Forlì",
  occ:[{d:19,s:"10:00",e:"23:59",dl:"01:00"},{d:20,s:"10:00",e:"23:59",dl:"24:00"}],
  det:[["Orari","Sabato 19: 10:00 – 01:00\nDomenica 20: 10:00 – 24:00"]]},

 {id:"mestieri", p:10, cat:"rievocazione", t:"Antichi mestieri",
  sub:"Attività artigianali dell'Ottocento",
  luogo:"Loggia di Piazza Saffi", indir:"Piazza Saffi",
  mapq:"Piazza Aurelio Saffi Forlì",
  occ:[{d:19,s:"10:30",e:"18:30"}], det:[]},

 {id:"giochi", p:6, cat:"giochi", t:"Giochi storici e d'epoca",
  sub:"Giochi e passatempi dell'Ottocento",
  luogo:"Piazzetta della Misura", indir:"Forlì, centro storico",
  mapq:"Piazzetta della Misura Forlì",
  occ:[{d:19,s:"10:30",e:"18:30"}], det:[]},

 {id:"ludica", p:11, cat:"strategia", t:"Area ludica — comanda le truppe, riscrivi la battaglia",
  sub:"Wargame storici con miniature dipinte a mano",
  luogo:"Salone del Chiostro di San Mercuriale", indir:"Piazza Saffi",
  mapq:"Abbazia di San Mercuriale Piazza Saffi Forlì",
  occ:[{d:19,s:"10:30",e:"18:30"}],
  det:[["Tavolo 1","Sharp Practice · miniature 28 mm — schermaglie e sezioni di battaglia, poche truppe e decisioni rapide"],
       ["Tavolo 2","Piquet Battle Command · miniature 10 mm — battaglie intere, dadi e mazzo di carte per ordini e iniziativa"],
       ["Come funziona","Miniature dipinte a mano con le divise del Risorgimento. Il dado a sei facce decide movimenti, ordini e fuoco. I regolamenti sono costruiti sulle tattiche reali dell'epoca: la battaglia può finire diversamente."],
       ["Accesso","Dimostrazioni e tavoli aperti, prove di gioco con gli organizzatori"]]},

 {id:"campo", p:3, cat:"rievocazione", t:"Accampamento storico militare",
  sub:"Visita guidata al campo militare",
  luogo:"Giardini Orselli", indir:"Forlì, centro storico",
  mapq:"Giardini Orselli Forlì",
  occ:[{d:19,s:"12:00",e:"20:00"},{d:20,s:"10:00",e:"12:00"}],
  det:[["Orari","Sabato 19: visita guidata 12:00 – 20:00\nDomenica 20: visita 10:00 – 12:00"]]},

 {id:"alza", p:2, cat:"rievocazione", t:"Cerimonia di apertura con alzabandiera",
  sub:"Palo dell'alzabandiera", luogo:"Piazza Saffi", indir:"",
  mapq:"Piazza Aurelio Saffi Forlì",
  occ:[{d:19,s:"15:00",e:""}], det:[]},

 {id:"battaglia", p:1, cat:"rievocazione", t:"Parata storica e battaglia dal vivo",
  sub:"Rievocazione dello scontro tra Francesi e Garibaldini — Repubblica Romana 1849",
  luogo:"Piazza Saffi", indir:"Lato Palazzo delle Poste",
  mapq:"Piazza Aurelio Saffi Forlì",
  occ:[{d:19,s:"15:30",e:"17:00"},{d:20,s:"14:30",e:"16:00"}],
  det:[["Orari","Sabato 19: 15:30 – 17:00\nDomenica 20: 14:30 – 16:00"],
       ["Nota","È il momento clou del Festival. Conviene arrivare con un po' di anticipo."]]},

 {id:"conc1", p:4, cat:"concerto", t:"Concerto verdiano",
  sub:"Musiche di Giuseppe Verdi · 1813–1901",
  luogo:"ex Chiesa di San Giacomo", indir:"presso il Museo San Domenico",
  mapq:"Musei San Domenico Forlì",
  occ:[{d:19,s:"21:00",e:"23:00"}],
  det:[["Direttore d'orchestra","Michele Bui — Orchestra Filarmonica delle Terre Verdiane di Reggio Emilia"],
       ["Interpreti","Soprano Antonella Orefice · Mezzosoprano Tatiana Shumkova\nTenore Christian Cola · Pianista Michele Catalano"],
       ["Cori","Coro Città di Forlì · Corale Lirica San Rocco"],
       ["Prima parte","1. La Traviata — Preludio, atto I\n2. La Traviata — «Dei miei bollenti spiriti», Alfredo\n3. Il Trovatore — «Stride la vampa», Azucena e coro\n4. La Forza del Destino — «La Vergine degli angeli», Leonora e coro\n5. Nabucco — «Va' pensiero», coro\n6. Nabucco — Sinfonia"],
       ["Seconda parte","7. Un Ballo in Maschera — «Re dell'abisso», Ulrica e coro\n8. Aida — Preludio\n9. Aida — «Celeste Aida», Radamès\n10. Aida — «Ritorna vincitor», Aida\n11. Aida — Scena del trionfo, orchestra\n12. Aida — Finale IV: «O terra addio»"]]},

 {id:"picchetti", p:2, cat:"rievocazione", t:"Picchetti d'onore e cambio della guardia",
  sub:"Palo dell'alzabandiera", luogo:"Piazza Saffi", indir:"",
  mapq:"Piazza Aurelio Saffi Forlì",
  occ:[{d:20,s:"09:30",e:"12:00"}], det:[]},

 {id:"ammaina", p:2, cat:"rievocazione", t:"Cerimonia di chiusura con ammainabandiera",
  sub:"Palo dell'alzabandiera", luogo:"Piazza Saffi", indir:"",
  mapq:"Piazza Aurelio Saffi Forlì",
  occ:[{d:20,s:"16:30",e:""}], det:[]},

 {id:"conc2", p:5, cat:"concerto", t:"Concerto per soprano e pianoforte",
  sub:"Musiche dei compositori del Risorgimento · Verdi, Bellini, Donizetti, Liszt, Rossini",
  luogo:"Abbazia di San Mercuriale", indir:"Piazza Saffi",
  mapq:"Abbazia di San Mercuriale Piazza Saffi Forlì",
  occ:[{d:20,s:"21:00",e:"23:00"}],
  det:[["Interpreti","Soprano Antonella Orefice · Pianista Sergio Catalano"],
       ["Prima parte","1. «Vaga Luna» — V. Bellini\n2. «Malinconia» — V. Bellini\n3. «La Figlia del Reggimento», aria «Convien Partir» — G. Donizetti\n4. «Norma», aria «Casta Diva» — V. Bellini\n5. Parafrasi sul «Rigoletto» di G. Verdi — F. Liszt"],
       ["Seconda parte","6. «L'Invito» — G. Rossini\n7. «Giusto in ciel» — G. Rossini\n8. «Non t'accostare all'urna» — G. Verdi\n9. «Ad una stella» — G. Verdi\n10. «Il Tramonto» — G. Verdi\n11. Parafrasi sul «Rigoletto» di G. Verdi — F. Liszt\n12. «Otello», aria di Desdemona «Ave Maria» — G. Verdi"]]},

 {id:"conv3", p:8, cat:"convegno", t:"«Garibaldi e Mazzini due facce della stessa medaglia»",
  sub:"Terza serata di convegni",
  luogo:"Salone del Palazzo del Comune", indir:"Piazza Saffi",
  mapq:"Palazzo Comunale Piazza Saffi Forlì",
  occ:[{d:25,s:"20:00",e:"23:00"}],
  det:[["Introduce","Prof. Andrea Sirotti Gaudenzi — Docente e saggista"],
       ["Relatori","Dott. Maurizio Casadei — Presidente regionale ANVRG\nProf. Luigi Ascanio — Presidente dell'Istituto per la Storia del Risorgimento Italiano, Forlì\nDott. Pietro Caruso — Giornalista, Direttore del «Pensiero Mazziniano»"],
       ["Coordina","Prof. Marco Tupponi — Avvocato e Docente"]]},

 {id:"cri", p:13, cat:"servizio", t:"Postazione Croce Rossa Italiana",
  sub:"Presidio sanitario del Festival",
  luogo:"Antistante il Chiostro di San Mercuriale", indir:"Piazza Saffi",
  mapq:"Abbazia di San Mercuriale Piazza Saffi Forlì",
  occ:[{d:19,s:"10:00",e:"23:59",dl:"chiusura"},{d:20,s:"10:00",e:"23:59",dl:"chiusura"}],
  det:[["Servizio","Presidio attivo durante le attività del weekend storico"]]}
];

// posizioni sulla planimetria, in % dell'immagine
const PUNTI = {1:[65.6,55.8],2:[62.4,59.3],3:[42.6,26.7],4:[5.2,89.0],5:[75.1,60.7],
 6:[43.4,50.5],7:[49.8,43.8],8:[51.2,60.0],9:[47.4,70.8],10:[53.2,75.2],
 11:[73.2,69.6],12:[55.8,70.3],13:[68.7,64.6]};

const CAT = {
 convegno:{l:"Convegno",c:"#F2B22E"},
 mostra:{l:"Mostra",c:"#E9E4D6"},
 rievocazione:{l:"Rievocazione",c:"#D9453F"},
 concerto:{l:"Concerto",c:"#7FC2F2"},
 strategia:{l:"Giochi di strategia",c:"#8ED4A8"},
 giochi:{l:"Giochi d'epoca",c:"#B9A8E0"},
 cucina:{l:"Cucina risorgimentale",c:"#F0A07A"},
 servizio:{l:"Servizio",c:"#B9C6D4"}
};

const GIORNI = [11,12,13,15,16,17,18,19,20,22,23,24,25,26,27];