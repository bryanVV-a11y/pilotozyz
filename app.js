const L=[["Press inclinado en Smith",2,"1–2"],["Press de hombro en Smith",2,"1–2"],["Fondos en máquina de tríceps (inclinado)",2,"1–2"],["Peck deck",3,"0–1","última al fallo"],["Elevaciones laterales en máquina",3,"0–1"],["Extensión de tríceps sobre la cabeza en polea",3,"0–1"],["Abdomen en máquina",2,"0–2"]];
const M=[["Curl inclinado con mancuernas",3,"0–1"],["Curl martillo",3,"0–1"],["Dominadas lastradas (+20 kg)",3,"1–2"],["Jalón al pecho",2,"1–2"],["Remo bajo con apoyo en el pecho",2,"1–2"],["Remo T",3,"1–2"],["Peck deck inverso (hombro posterior)",3,"0–1"]];
const W=[["Extensión de cuádriceps",3,"0–1"],["Hack",2,"1–2"],["Curl femoral sentado",2,"0–1"],["Curl femoral acostado",2,"0–1"],["Pantorrilla en prensa (unilateral)",3,"0–1","series por pierna"],["Abductores",2,"0–2"],["Abdomen en máquina",3,"0–2"]];
const V=[["Elevaciones laterales en máquina",3,"0–1"],["Dominadas lastradas (+20 kg)",2,"1–2"],["Remo T",3,"1–2"],["Press inclinado en Smith",2,"1–2"],["Peck deck",2,"0–1"],["Peck deck inverso (hombro posterior)",2,"0–1"],["Curl alternado de pie",3,"0–1"],["Curl martillo",2,"0–1"],["Extensión de tríceps sobre la cabeza en polea",3,"0–1"],["Extensión Carter",2,"0–1"]];
// El miércoles empieza con hombro y tríceps (frecuencia 3); el sábado repite solo la base de pierna
const WX=[["Elevaciones laterales en máquina",3,"0–1"],["Extensión de tríceps en polea (pushdown)",3,"0–1"]];
const D={lun:{n:"Lunes",x:L},mar:{n:"Martes",x:M},mie:{n:"Miércoles",x:WX.concat(W)},jue:{n:"Jueves",x:[]},vie:{n:"Viernes",x:V},sab:{n:"Sábado",x:W},dom:{n:"Domingo",x:[]}};
const K="rutina_v1",$=id=>document.getElementById(id);
let S={wk:1,logs:{},hist:[]};
try{Object.assign(S,JSON.parse(localStorage.getItem(K)||"{}"))}catch(e){}
const mk=()=>{const p={};for(const d in D)p[d]=D[d].x.map((e,i)=>({id:String(i),n:e[0],s:e[1],r:e[2],t:e[3]||""}));return p};
if(!S.plan)S.plan=mk();for(const d in D)if(!S.plan[d])S.plan[d]=[];if(!S.u)S.u="kg";
for(const k in S.logs){const l=S.logs[k];if(!l.u&&(l.w||l.d))l.u=S.u}
let ed=false;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const tot=d=>S.plan[d].reduce((a,e)=>a+e.s,0);
const cnt=d=>Object.keys(S.logs).filter(k=>k.startsWith(d+"|")&&S.logs[k].d).length;
let cur={1:"lun",2:"mar",3:"mie",5:"vie",6:"sab"}[new Date().getDay()]||"lun";

function fld(f,lb,v,st){return `<div><span>${lb}</span><div class="st"><button data-a="m" data-f="${f}" data-s="${st}">−</button><input type="number" inputmode="decimal" min="0" data-f="${f}" value="${v??""}"><button data-a="p" data-f="${f}" data-s="${st}">+</button></div></div>`}
function tabs(){$("tabs").innerHTML=diasActivos().map(d=>`<button data-d="${d}" class="${d==cur?"on":""}">${D[d].n.slice(0,3)}<small>${cnt(d)}/${tot(d)}</small></button>`).join("")}
function prog(){$("dn").textContent=D[cur].n;$("pg").textContent="Semana "+S.wk+" · "+cnt(cur)+" / "+tot(cur)+" series";tabs()}
function render(){
  if(!diasActivos().includes(cur))cur=diasActivos()[0]||"lun";
  if(!S.rutina){$("list").innerHTML='<section class="vacio"><h2>Sin rutina todavía</h2><p class="mu">Escoge una rutina popular o crea la tuya.</p><button class="pri" data-go="biblio">Escoge o personaliza tu rutina</button><button class="sec" data-go="biblio">Comenzar</button></section>';prog();return}
  let h="";
  if(ed)h+='<div class="note">Modo edición: cambia el nombre, mueve con ↑ ↓ o ajusta las series. Cada día se edita por separado (miércoles y sábado también).</div>';
  S.plan[cur].forEach(e=>{
    if(ed){
      h+=`<section class="card" data-id="${e.id}"><div class="ed"><input data-a="nm" value="${esc(e.n)}" aria-label="Nombre"><button data-a="up" aria-label="Subir">↑</button><button data-a="dn" aria-label="Bajar">↓</button></div><div class="sc"><span class="mu">Series</span><button data-a="sm">−</button><b>${e.s}</b><button data-a="sp">+</button><span class="mu">RIR ${e.r}</span></div></section>`;return;
    }
    h+=`<section class="card"><h2>${esc(e.n)}</h2><p class="mu">${e.s} series${e.r?" · RIR "+e.r:""}${e.t?" · "+e.t:""}</p>`;
    for(let s=0;s<e.s;s++){
      const k=cur+"|"+e.id+"|"+s,l=S.logs[k]||{},u=l.u||S.u,st=u=="kg"?2.5:5;
      h+=`<div class="row${l.d?" done":""}" data-k="${k}"><div class="rt"><span>Serie ${s+1}</span><small>Target</small><button class="ck" data-a="ck" aria-label="Marcar completada">${l.d?"✓":""}</button></div><div class="fl">${fld("w",`Carga <button class="ub" data-a="u" aria-label="Cambiar unidad">${u}</button>`,l.w,st)}${fld("r","Reps",l.r,1)}<div><span>RIR real</span><select data-f="q">${["","0","1","2","3","4","5+"].map(o=>`<option value="${o}"${(l.q||"")===o?" selected":""}>${o||"—"}</option>`).join("")}</select></div></div></div>`;
    }
    h+="</section>";
  });
  $("list").innerHTML=h;prog();
}
function edit(a,id){
  const L=S.plan[cur],i=L.findIndex(e=>e.id==id),e=L[i];if(!e)return;
  if(a=="up"&&i>0)[L[i-1],L[i]]=[L[i],L[i-1]];
  else if(a=="dn"&&i<L.length-1)[L[i+1],L[i]]=[L[i],L[i+1]];
  else if(a=="sp"&&e.s<10)e.s++;
  else if(a=="sm"&&e.s>1){
    const k=cur+"|"+id+"|"+(e.s-1),l=S.logs[k];
    const go=()=>{delete S.logs[k];e.s--;save();render()};
    if(l&&(l.d||l.w||l.r||l.q))return ask("La serie "+e.s+" de «"+e.n+"» tiene datos. ¿Eliminarla?",go);
    return go();
  }
  save();render();
}
$("list").addEventListener("click",ev=>{
  const b=ev.target.closest("button[data-a]");if(!b)return;
  const a=b.dataset.a;
  if(ed){edit(a,b.closest(".card").dataset.id);return}
  const row=b.closest(".row"),k=row.dataset.k,l=S.logs[k]=S.logs[k]||{};
  if(a=="u"){l.u=(l.u||S.u)=="kg"?"lb":"kg";save();render();return}
  if(a=="ck"){
    l.d=!l.d;row.classList.toggle("done",l.d);b.textContent=l.d?"✓":"";
    if(l.d){l.t=today();l.u=l.u||S.u}else delete l.t;
    prog();
  }else{
    const f=b.dataset.f,inp=row.querySelector(`input[data-f="${f}"]`),st=+b.dataset.s;
    let v=(parseFloat(inp.value)||0)+(a=="p"?st:-st);v=Math.max(0,Math.round(v*100)/100);
    inp.value=v;l[f]=v;if(f=="w")l.u=l.u||S.u;
  }
  save();
});
$("list").addEventListener("input",ev=>{
  const t=ev.target;
  if(t.dataset.a=="nm"){const e=S.plan[cur].find(x=>x.id==t.closest(".card").dataset.id);if(e){e.n=t.value;save()}return}
  const f=t.dataset.f;if(!f)return;
  const k=t.closest(".row").dataset.k,l=S.logs[k]=S.logs[k]||{};
  l[f]=t.value;if(f=="w")l.u=l.u||S.u;save();
});
$("tabs").addEventListener("click",ev=>{const b=ev.target.closest("button[data-d]");if(b){cur=b.dataset.d;render();scrollTo(0,0)}});

/* Cuadros de diálogo propios (los visores integrados bloquean confirm y descargas) */
function modal(msg,btns,text){
  $("mt").textContent=msg;const x=$("mx");x.hidden=text==null;x.value=text==null?"":text;
  const m=$("mb");m.innerHTML="";
  btns.forEach(([l,f,keep])=>{const b=document.createElement("button");b.textContent=l;b.onclick=()=>{if(!keep)$("md").hidden=true;if(f)f(x,b)};m.appendChild(b)});
  $("md").hidden=false;
}
const ask=(msg,ok)=>modal(msg,[["Cancelar"],["Confirmar",ok]]);

/* Exportar y datos */
function rows(){
  return Object.keys(S.logs).filter(k=>{const l=S.logs[k];return l.d||l.w||l.r||l.q}).sort().map(k=>{
    const [d,i,s]=k.split("|"),l=S.logs[k];
    return{fecha:l.t||today(),semana:S.wk,dia:D[d].n,ejercicio:(S.plan[d].find(e=>e.id==i)||{n:"?"}).n,serie:+s+1,kg:l.w??"",unidad:l.u||S.u,reps:l.r??"",rir:l.q??"",completada:l.d?"sí":"no"};
  });
}
function dl(name,txt,type){
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type}));a.download=name;
  document.body.appendChild(a);a.click();a.remove();
}
function csvText(){
  const all=S.hist.concat(rows()),c=["fecha","semana","dia","ejercicio","serie","kg","unidad","reps","rir","completada"];
  const q=v=>'"'+String(v).replace(/"/g,'""')+'"';
  return [c.join(",")].concat(all.map(r=>c.map(x=>q(r[x]??(x=="unidad"?"kg":""))).join(","))).join("\n");
}
function copy(x,b){
  x.focus();x.select();x.setSelectionRange(0,x.value.length);
  let ok=false;try{ok=document.execCommand("copy")}catch(e){}
  if(ok){b.textContent="Copiado ✓";return}
  if(navigator.clipboard)navigator.clipboard.writeText(x.value).then(()=>b.textContent="Copiado ✓").catch(()=>b.textContent="Mantén pulsado y copia");
  else b.textContent="Mantén pulsado y copia";
}
function exp(name,txt,type,bom){
  const bt=[["Copiar",copy,true]];
  if(navigator.share)bt.push(["Compartir",async()=>{try{const f=new File([txt],name,{type});if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f]});else await navigator.share({title:name,text:txt})}catch(e){}},true]);
  bt.push(["Descargar",()=>dl(name,(bom?"\ufeff":"")+txt,type),true],["Cerrar"]);
  modal("Pulsa Copiar y pégalo en Notas, Numbers o Excel. Compartir y Descargar solo funcionan si tu visor los permite.",bt,txt);
}
$("xc").onclick=()=>exp("rutina_"+today()+".csv",csvText(),"text/csv;charset=utf-8",true);
$("xj").onclick=()=>exp("rutina_"+today()+".json",JSON.stringify({semana:S.wk,historial:S.hist,semana_actual:rows()},null,2),"application/json");
$("nw").onclick=()=>ask("¿Iniciar la semana "+(S.wk+1)+"? Lo registrado pasa al historial y las series se reinician.",()=>{
  S.hist=S.hist.concat(rows());S.logs={};S.wk++;save();render();
});
$("cl").onclick=()=>ask("¿Borrar todos los registros y el historial? La rutina editada se conserva. No se puede deshacer.",()=>{
  S={wk:1,logs:{},hist:[],plan:S.plan,u:S.u};save();render();
});
const ub=()=>{$("un").textContent="Unidad base: "+S.u;$("ed").textContent=ed?"Salir de edición":"Editar rutina"};
$("ed").onclick=()=>{ed=!ed;ub();render()};
$("un").onclick=()=>{S.u=S.u=="kg"?"lb":"kg";save();ub();render()};
ub();
render();
