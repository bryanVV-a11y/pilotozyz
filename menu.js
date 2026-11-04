/* Menú lateral (☰): panel principal con submenús Datos y Rutina */

const dr = $('drawer'), ov = $('ov');
const vistas = ['dv-main', 'dv-datos', 'dv-rutina'];

function mostrar(id) { vistas.forEach(v => $(v).hidden = (v !== id)); }
function abrir() { mostrar('dv-main'); ov.hidden = false; dr.classList.add('abierto'); }
function cerrar() { dr.classList.remove('abierto'); ov.hidden = true; }

$('menu').onclick = () => dr.classList.contains('abierto') ? cerrar() : abrir();
$('dclose').onclick = cerrar;
ov.onclick = cerrar;

dr.addEventListener('click', ev => {
  const sub = ev.target.closest('[data-sub]');
  if (sub) return mostrar('dv-' + sub.dataset.sub);
  if (ev.target.closest('[data-back]')) return mostrar('dv-main');
  // Cualquier acción (exportar, importar, ver progreso, etc.) cierra el menú
  if (ev.target.closest('button.drow')) cerrar();
});
