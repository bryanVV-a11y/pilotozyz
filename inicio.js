/* Pantalla de inicio: elegir los días de entreno. No borra datos.
   Si ya tienes registros, se conservan los días de siempre (lunes, martes, miércoles, viernes y sábado). */

const CFG = 'config_v1';
const DIAS_TODOS = [
  ['lun', 'Lunes'], ['mar', 'Martes'], ['mie', 'Miércoles'], ['jue', 'Jueves'],
  ['vie', 'Viernes'], ['sab', 'Sábado'], ['dom', 'Domingo']
];
const DIAS_LEGADO = ['lun', 'mar', 'mie', 'vie', 'sab'];
let seleccion = {};

function cargarConfig() {
  try { return JSON.parse(localStorage.getItem(CFG) || 'null'); } catch (e) { return null; }
}

// Días que se muestran en la app (usado por app.js)
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

function guardarConfig(dias) {
  try { localStorage.setItem(CFG, JSON.stringify({ dias: dias })); } catch (e) {}
}

function pintarDias() {
  $('ini-dias').innerHTML = DIAS_TODOS.map(([k, n]) =>
    `<button class="dchip${seleccion[k] ? ' on' : ''}" data-d="${k}">${n}</button>`).join('');
  $('ini-ok').disabled = !Object.values(seleccion).some(Boolean);
  $('ini-cancel').hidden = !cargarConfig();
}

function mostrarInicio() {
  const actuales = diasActivos();
  seleccion = {};
  DIAS_TODOS.forEach(([k]) => { seleccion[k] = actuales.includes(k); });
  pintarDias();
  $('inicio').hidden = false;
}

function iniciarInicio() {
  // Usuarios con registros: se guardan sus días actuales y no se muestra la pantalla
  if (!cargarConfig()) {
    if (hayRegistros()) guardarConfig(Object.fromEntries(DIAS_LEGADO.map(k => [k, true])));
    else mostrarInicio();
  }

  $('ini-dias').addEventListener('click', ev => {
    const b = ev.target.closest('[data-d]');
    if (!b) return;
    seleccion[b.dataset.d] = !seleccion[b.dataset.d];
    pintarDias();
  });

  $('ini-ok').onclick = () => {
    const dias = {};
    Object.keys(seleccion).forEach(k => { if (seleccion[k]) dias[k] = true; });
    guardarConfig(dias);
    $('inicio').hidden = true;
    render();
    ub();
    if (!S.rutina) abrirBiblioteca();
  };

  $('ini-cancel').onclick = () => { $('inicio').hidden = true; };
  $('cambiardias').onclick = mostrarInicio;
}
