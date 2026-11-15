/* Inicio: objetivo y experiencia, frecuencia recomendada y días de entreno.
   No borra datos. Si ya tienes registros, se conservan tus días de siempre. */

const CFG = 'config_v1';
const DIAS_TODOS = [
  ['lun', 'Lunes'], ['mar', 'Martes'], ['mie', 'Miércoles'], ['jue', 'Jueves'],
  ['vie', 'Viernes'], ['sab', 'Sábado'], ['dom', 'Domingo']
];
const DIAS_LEGADO = ['lun', 'mar', 'mie', 'vie', 'sab'];
const PATRON = { 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
const RECOMIENDA = { principiante: 3, intermedio: 4, avanzado: 5 };
const OBJETIVOS = [['fuerza', 'Fuerza'], ['hipertrofia', 'Músculo'], ['grasa', 'Perder grasa']];
const NIVELES = [['principiante', 'Principiante · 0-1 año'], ['intermedio', 'Intermedio · 1-3 años'], ['avanzado', 'Avanzado · 3+ años']];

let seleccion = {};
let perfilSel = { objetivo: null, nivel: null };
let frecSel = null;

function cargarConfig() {
  try { return JSON.parse(localStorage.getItem(CFG) || 'null'); } catch (e) { return null; }
}

// Días que se muestran en la app (usado por app.js y biblioteca.js)
function diasActivos() {
  const c = cargarConfig();
  if (c && c.dias) return DIAS_TODOS.map(d => d[0]).filter(k => c.dias[k]);
  return DIAS_LEGADO;
}

function hayRegistros() {
  try {
    const s = JSON.parse(localStorage.getItem('rutina_v1') || 'null');
    return !!s && ((s.logs && Object.keys(s.logs).length > 0) || (s.hist && s.hist.length > 0));
  } catch (e) { return false; }
}

function guardarConfig(extra) {
  const previa = cargarConfig() || {};
  try { localStorage.setItem(CFG, JSON.stringify(Object.assign({}, previa, extra))); } catch (e) {}
}

function nivelActual() {
  return perfilSel.nivel || (cargarConfig() || {}).nivel || null;
}

function recomendada() {
  const n = nivelActual();
  return n ? RECOMIENDA[n] : null;
}

/* ---------- Paso 1: objetivo y experiencia ---------- */

function pintarPerfil() {
  $('ini-obj').innerHTML = OBJETIVOS.map(([k, n]) =>
    `<button class="dchip${perfilSel.objetivo === k ? ' on' : ''}" data-obj="${k}">${n}</button>`).join('');
  $('ini-niv').innerHTML = NIVELES.map(([k, n]) =>
    `<button class="dchip${perfilSel.nivel === k ? ' on' : ''}" data-niv="${k}">${n}</button>`).join('');
  $('ini-sig').disabled = !(perfilSel.objetivo && perfilSel.nivel);
}

function mostrarPerfil() {
  perfilSel = { objetivo: null, nivel: null };
  pintarPerfil();
  $('ini-perfil').hidden = false;
  $('inicio').hidden = true;
}

/* ---------- Paso 2: frecuencia y días ---------- */

function pintarDias() {
  const rec = recomendada();
  $('ini-frec').innerHTML = [3, 4, 5, 6].map(n =>
    `<button class="dchip${frecSel === n ? ' on' : ''}" data-frec="${n}">${n} días${rec === n ? ' · Recomendado' : ''}</button>`).join('');
  $('ini-dias').innerHTML = DIAS_TODOS.map(([k, n]) =>
    `<button class="dchip${seleccion[k] ? ' on' : ''}" data-d="${k}">${n}</button>`).join('');
  $('ini-ok').disabled = !Object.values(seleccion).some(Boolean);
  $('ini-cancel').hidden = !cargarConfig();
}

function mostrarDias() {
  $('ini-perfil').hidden = true;
  const actuales = diasActivos();
  seleccion = {};
  DIAS_TODOS.forEach(([k]) => { seleccion[k] = actuales.includes(k); });
  const rec = recomendada();
  frecSel = (cargarConfig() || {}).frecuencia || rec || null;
  pintarDias();
  $('inicio').hidden = false;
}

function iniciarInicio() {
  // Usuarios con registros: se conservan sus días y no se muestra la pantalla
  if (!cargarConfig()) {
    if (hayRegistros()) {
      guardarConfig({ dias: Object.fromEntries(DIAS_LEGADO.map(k => [k, true])) });
    } else {
      mostrarPerfil();
    }
  }

  $('ini-obj').addEventListener('click', ev => {
    const b = ev.target.closest('[data-obj]');
    if (!b) return;
    perfilSel.objetivo = b.dataset.obj;
    pintarPerfil();
  });

  $('ini-niv').addEventListener('click', ev => {
    const b = ev.target.closest('[data-niv]');
    if (!b) return;
    perfilSel.nivel = b.dataset.niv;
    pintarPerfil();
  });

  $('ini-sig').onclick = () => { mostrarDias(); };

  $('ini-frec').addEventListener('click', ev => {
    const b = ev.target.closest('[data-frec]');
    if (!b) return;
    const n = +b.dataset.frec;
    frecSel = n;
    seleccion = {};
    DIAS_TODOS.forEach(([k]) => { seleccion[k] = false; });
    PATRON[n].forEach(i => { seleccion[DIAS_TODOS[i][0]] = true; });
    pintarDias();
  });

  $('ini-dias').addEventListener('click', ev => {
    const b = ev.target.closest('[data-d]');
    if (!b) return;
    seleccion[b.dataset.d] = !seleccion[b.dataset.d];
    frecSel = null;
    pintarDias();
  });

  $('ini-ok').onclick = () => {
    const dias = {};
    Object.keys(seleccion).forEach(k => { if (seleccion[k]) dias[k] = true; });
    const total = Object.keys(dias).length;
    const extra = { dias: dias, frecuencia: total };
    if (perfilSel.objetivo) extra.objetivo = perfilSel.objetivo;
    if (perfilSel.nivel) extra.nivel = perfilSel.nivel;
    guardarConfig(extra);
    $('inicio').hidden = true;
    render();
    ub();
    if (!S.rutina) abrirBiblioteca();
  };

  $('ini-cancel').onclick = () => { $('inicio').hidden = true; $('ini-perfil').hidden = true; };
  $('cambiardias').onclick = mostrarDias;
}
