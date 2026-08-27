/* ---------- utilità ---------- */
const NOMI=["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"];
const ABBR=["dom","lun","mar","mer","gio","ven","sab"];
const dt=(g,hm)=>new Date(2026,8,g,+(hm||"00:00").split(":")[0],+(hm||"00:00").split(":")[1]);
const nomeGiorno=g=>NOMI[new Date(2026,8,g).getDay()];
const abbrGiorno=g=>ABBR[new Date(2026,8,g).getDay()];
const ora=()=>new Date();

// tutte le occorrenze in ordine cronologico
const OCC=[];
EVENTI.forEach(e=>e.occ.forEach(o=>OCC.push({e,g:o.d,s:o.s,f:o.dl||o.e,i:dt(o.d,o.s),fi:dt(o.d,o.e||o.s)})));
OCC.sort((a,b)=>a.i-b.i);

const ICO={
 luogo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
 ora:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 vai:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-8-8 18-2-8-8-2z"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'
};

function fasciaOraria(e){
  const u=[...new Set(e.occ.map(o=>(o.dl||o.e)?o.s+"–"+(o.dl||o.e):o.s))];
  return u.length===1?u[0]:e.occ.map(o=>abbrGiorno(o.d)+" "+o.s).join(" · ");
}

/* ---------- schede ---------- */
function cardEvento(o,mostraGiorno){
  const c=CAT[o.e.cat], live=o.i<=ora()&&ora()<=o.fi;
  const b=document.createElement("button");
  b.className="ev";
  b.innerHTML=
    '<div class="ora">'+o.s+(o.f?'<small>→ '+o.f+'</small>':'')+
      (mostraGiorno?'<small>'+abbrGiorno(o.g)+' '+o.g+'</small>':'')+'</div>'+
    '<div><span class="pill" style="background:'+c.c+'">'+c.l+'</span>'+
      (live?'<span class="badge-live">in corso</span>':'')+
      '<div class="tit"></div>'+
      '<div class="luo"><span class="num">'+o.e.p+'</span><span class="lg-l"></span></div></div>';
  b.querySelector(".tit").textContent=o.e.t;
  b.querySelector(".lg-l").textContent=o.e.luogo;
  b.onclick=()=>apri(o.e);
  return b;
}

/* ---------- vista ADESSO ---------- */
function renderAdesso(){
  const n=ora(), hero=document.getElementById("hero"), corpo=document.getElementById("adesso-corpo");
  const inizio=dt(11,"20:00"), fine=dt(27,"19:00");
  corpo.innerHTML="";

  if(n<inizio){
    const gg=Math.ceil((dt(11,"00:00")-n)/864e5);
    hero.innerHTML='<div class="lbl">Manca poco</div><div class="big">'+gg+'</div>'+
      '<div class="cap">giorn'+(gg===1?"o":"i")+' all\'apertura del Festival<br>venerdì 11 settembre, ore 20:00</div>';
    const sez=document.createElement("div");
    sez.className="sez"; sez.textContent="I primi appuntamenti";
    corpo.appendChild(sez);
    OCC.filter(o=>o.e.id!=="mostra").slice(0,4).forEach(o=>corpo.appendChild(cardEvento(o,true)));
    return;
  }
  if(n>fine){
    hero.innerHTML='<div class="lbl">Edizione conclusa</div><div class="big">Grazie</div>'+
      '<div class="cap">Il Festival del Risorgimento 2026 si è concluso.<br>Ci vediamo alla prossima edizione.</div>';
    return;
  }

  const inCorso=OCC.filter(o=>o.i<=n&&n<=o.fi);
  const prossimi=OCC.filter(o=>o.i>n);

  if(inCorso.length){
    hero.innerHTML='<div class="lbl">In questo momento</div><div class="big" style="font-size:30px">'+inCorso.length+
      (inCorso.length===1?' evento':' eventi')+'</div><div class="cap">in corso adesso in centro storico</div>';
    const s=document.createElement("div"); s.className="sez"; s.textContent="Aperto adesso"; corpo.appendChild(s);
    inCorso.forEach(o=>corpo.appendChild(cardEvento(o,false)));
  }else if(prossimi.length){
    const p=prossimi[0], stessoG=p.i.getDate()===n.getDate();
    const gg=Math.ceil((dt(p.g,"00:00")-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5);
    hero.innerHTML='<div class="lbl">Prossimo appuntamento</div>'+
      '<div class="big" style="font-size:32px">'+(stessoG?"oggi":(gg===1?"domani":nomeGiorno(p.g)+" "+p.g))+'</div>'+
      '<div class="cap">'+p.s+' · '+p.e.luogo+'</div>';
  }

  if(prossimi.length){
    const s=document.createElement("div"); s.className="sez"; s.textContent="In arrivo"; corpo.appendChild(s);
    prossimi.slice(0,5).forEach(o=>corpo.appendChild(cardEvento(o,true)));
  }
}

/* ---------- vista MAPPA ---------- */
let giornoMappa=0, pinAttivo=null;
function renderMappa(){
  const w=document.getElementById("mapwrap"), lg=document.getElementById("legenda");
  w.querySelectorAll(".pin").forEach(p=>p.remove());
  const punti={};
  EVENTI.forEach(e=>{ (punti[e.p]=punti[e.p]||[]).push(e); });

  Object.keys(punti).forEach(p=>{
    const attivi=punti[p].filter(e=>giornoMappa===0||e.occ.some(o=>o.d===giornoMappa));
    const b=document.createElement("button");
    b.className="pin"+(attivi.length?"":" dim")+(pinAttivo==p?" act":"");
    b.style.left=PUNTI[p][0]+"%"; b.style.top=PUNTI[p][1]+"%";
    b.textContent=p; b.setAttribute("aria-label","Punto "+p+": "+punti[p][0].luogo);
    b.onclick=()=>{ pinAttivo=p; renderMappa(); apri((attivi[0]||punti[p][0])); };
    w.appendChild(b);
  });

  lg.innerHTML="";
  Object.keys(punti).sort((a,b)=>a-b).forEach(p=>{
    const attivi=punti[p].filter(e=>giornoMappa===0||e.occ.some(o=>o.d===giornoMappa));
    if(!attivi.length) return;
    const b=document.createElement("button"); b.className="lg";
    b.innerHTML='<span class="num">'+p+'</span><span><span class="lt"></span><span class="ll"></span></span>';
    b.querySelector(".lt").textContent=attivi.map(e=>e.t).join(" · ");
    b.querySelector(".ll").textContent=attivi[0].luogo+" · "+fasciaOraria(attivi[0]);
    b.onclick=()=>{pinAttivo=p;renderMappa();apri(attivi[0]);};
    lg.appendChild(b);
  });
}

/* ---------- vista PROGRAMMA ---------- */
let giornoProg=0;
function renderProg(){
  const c=document.getElementById("prog-corpo"); c.innerHTML="";
  const gs=giornoProg?[giornoProg]:GIORNI;
  let n=0;
  gs.forEach(g=>{
    const occ=OCC.filter(o=>o.g===g);
    if(!occ.length) return;
    n++;
    const h=document.createElement("div"); h.className="giorno-h";
    h.innerHTML='<span>'+nomeGiorno(g)+'</span> '+g+' settembre';
    c.appendChild(h);
    occ.forEach(o=>c.appendChild(cardEvento(o,false)));
  });
  if(!n) c.innerHTML='<div class="vuoto">Nessun evento in programma questo giorno.</div>';
}

/* ---------- sheet dettaglio ---------- */
function gcal(e){
  const o=e.occ[0], p=n=>String(n).padStart(2,"0");
  const f=(g,hm,add)=>{const d=dt(g,hm); d.setHours(d.getHours()+(add||0)-2);
    return d.getUTCFullYear()+p(d.getUTCMonth()+1)+p(d.getUTCDate())+"T"+p(d.getUTCHours())+p(d.getUTCMinutes())+"00Z";};
  return "https://calendar.google.com/calendar/render?action=TEMPLATE"+
    "&text="+encodeURIComponent(e.t)+
    "&dates="+f(o.d,o.s)+"/"+(o.e?f(o.d,o.e):f(o.d,o.s,2))+
    "&location="+encodeURIComponent(e.luogo+", Forlì")+
    "&details="+encodeURIComponent("Festival del Risorgimento · forlirisorge.it");
}
function apri(e){
  const c=CAT[e.cat], box=document.getElementById("sh-in");
  const giorni=e.occ.map(o=>abbrGiorno(o.d)+" "+o.d+" set · "+o.s+((o.dl||o.e)?"–"+(o.dl||o.e):"")).join("\n");
  box.innerHTML=
   '<span class="pill" style="background:'+c.c+'">'+c.l+'</span>'+
   '<h2></h2><p class="sh-sub"></p>'+
   '<div class="meta">'+
     '<div class="mrow">'+ICO.ora+'<div><b class="m-o"></b></div></div>'+
     '<div class="mrow">'+ICO.luogo+'<div><b class="m-l"></b><small class="m-i"></small></div></div>'+
   '</div>'+
   '<div class="azioni">'+
     '<a class="az pri" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+
       encodeURIComponent(e.mapq)+'">'+ICO.vai+'Portami qui</a>'+
     '<a class="az" target="_blank" rel="noopener" href="'+gcal(e)+'">'+ICO.cal+'Nel calendario</a>'+
   '</div>'+
   (e.det.length?'<div class="dett">'+e.det.map(d=>'<div class="dt"><div class="k">'+d[0]+'</div><div class="v"></div></div>').join("")+'</div>':"");
  box.querySelector("h2").textContent=e.t;
  box.querySelector(".sh-sub").textContent=e.sub||"";
  box.querySelector(".m-o").style.whiteSpace="pre-line";
  box.querySelector(".m-o").textContent=giorni;
  box.querySelector(".m-l").textContent="Punto "+e.p+" · "+e.luogo;
  box.querySelector(".m-i").textContent=e.indir||"";
  box.querySelectorAll(".dt .v").forEach((v,i)=>v.textContent=e.det[i][1]);
  document.getElementById("sheet").classList.add("on");
  document.getElementById("scrim").classList.add("on");
  document.body.style.overflow="hidden";
}
function chiudi(){
  document.getElementById("sheet").classList.remove("on");
  document.getElementById("scrim").classList.remove("on");
  document.body.style.overflow="";
}
document.getElementById("scrim").onclick=chiudi;
document.getElementById("chiudi").onclick=chiudi;
document.addEventListener("keydown",ev=>{if(ev.key==="Escape")chiudi();});

/* ---------- chips e tabs ---------- */
function buildChips(el,set){
  el.innerHTML="";
  const mk=(g,l)=>{const b=document.createElement("button");b.className="chip";b.textContent=l;
    b.setAttribute("aria-pressed","false");b.dataset.g=g;
    b.onclick=()=>{[...el.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");set(g);};el.appendChild(b);return b;};
  mk(0,"Tutti").setAttribute("aria-pressed","true");
  GIORNI.forEach(g=>{ if(OCC.some(o=>o.g===g)) mk(g,abbrGiorno(g)+" "+g); });
}
buildChips(document.getElementById("chips-mappa"),g=>{giornoMappa=g;pinAttivo=null;renderMappa();});
buildChips(document.getElementById("chips-prog"),g=>{giornoProg=g;renderProg();});

let mappaCentrata=false;
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{
  document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected","false"));
  t.setAttribute("aria-selected","true");
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("on"));
  document.getElementById("v-"+t.dataset.v).classList.add("on");
  if(t.dataset.v==="mappa"&&!mappaCentrata){mappaCentrata=true;applicaZoom(true);}
  window.scrollTo({top:0,behavior:"smooth"});
});
/* ---------- zoom mappa ---------- */
const LIV=[1,1.6,2.3,3.2];
let zi = window.innerWidth<560 ? 2 : 0;
const scroll=document.getElementById("mapscroll"), wrap=document.getElementById("mapwrap");
function applicaZoom(centra){
  const px=scroll.scrollWidth?(scroll.scrollLeft+scroll.clientWidth/2)/scroll.scrollWidth:.58;
  const py=scroll.scrollHeight?(scroll.scrollTop+scroll.clientHeight/2)/scroll.scrollHeight:.60;
  wrap.style.setProperty("--z",LIV[zi]);
  document.getElementById("zin").disabled = zi>=LIV.length-1;
  document.getElementById("zout").disabled = zi<=0;
  requestAnimationFrame(()=>{
    const cx=centra?.58:px, cy=centra?.60:py;
    scroll.scrollLeft=cx*scroll.scrollWidth-scroll.clientWidth/2;
    scroll.scrollTop =cy*scroll.scrollHeight-scroll.clientHeight/2;
  });
}
document.getElementById("zin").onclick=()=>{if(zi<LIV.length-1){zi++;applicaZoom(false);}};
document.getElementById("zout").onclick=()=>{if(zi>0){zi--;applicaZoom(false);}};

renderAdesso(); renderMappa(); renderProg(); wrap.style.setProperty("--z",LIV[zi]);
