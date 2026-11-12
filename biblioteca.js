/* Biblioteca de rutinas: 6 rutinas populares o una rutina personalizada.
   Antes de aplicar, la semana actual se guarda en el historial (no se pierde nada). */

let rutinaSel = null;
let B = null; // estado de la rutina personalizada

const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const nombreDia = d => Object.fromEntries(DIAS_TODOS)[d];

function parseSeries(v) {
  return Math.max(1, Math.min(10, parseInt(String(v).split('-')[0], 10) || 1));
}

function mostrarBuilder(html) {
  $('bib-lista').hidden = true;
  $('bib-detalle').hidden = false;
  $('bib-detalle').innerHTML = html;
}

function mostrarLista() {
  const actual = S.rutina ? S.rutina.nombre : '';
  $('bib-lista').innerHTML = '<h2>Elige tu rutina</h2>' +
    '<p class="mu">Se arma sola con tus días de entreno.</p>' +
    `<button class="rcard" data-r="custom"><b>Personalizada</b><small>Tú eliges los ejercicios, series y descansos</small></button>` +
    RUTINAS.map((r, i) => `
      <button class="rcard" data-r="${i}">
        <b>${esc(r.nombre)}</b>
        <small>${r.dias} días${r.adaptada ? ' · adaptada de ' + esc(r.adaptada) : ''}${actual === r.nombre ? ' · actual' : ''}</small>
      </button>`).join('');
  $('bib-lista').hidden = false;
  $('bib-detalle').hidden = true;
}

function mostrarDetalle(i) {
  rutinaSel = i;
  const r = RUTINAS[i];
  const dias = diasActivos();
  const filas = dias.map((d, k) => {
    const rd = r.dias_detalle[k];
    return `<li><b>${nombreDia(d)}</b>: ${rd ? esc(rd.nombre) : '<span class="mu">sin día de rutina (descanso)</span>'}</li>`;
  }).join('');

  let aviso = '';
  if (r.dias_detalle.length > dias.length) {
    aviso = `Esta rutina tiene ${r.dias_detalle.length} días y marcaste ${dias.length}. Se quedan fuera: ` +
            r.dias_detalle.slice(dias.length).map(d => esc(d.nombre)).join(', ') + '.';
  } else if (r.dias_detalle.length < dias.length) {
    aviso = 'Tienes más días que la rutina; los días sobrantes quedan vacíos.';
  }
  if (rows().length) aviso += (aviso ? ' ' : '') + 'Tu semana actual se guardará en el historial antes de aplicar la rutina.';

  mostrarBuilder(`
    <h2>${esc(r.nombre)}</h2>
    <ul class="bl">${filas}</ul>
    ${aviso ? `<p class="mu">${aviso}</p>` : ''}
    ${r.nota ? `<p class="mu">${esc(r.nota)}</p>` : ''}
    <button class="pri" id="bib-aplicar">Aplicar rutina</button>
    <button class="cerrar" id="bib-volver">Volver</button>`);
}

// Guarda la semana actual y pone el plan nuevo (lo usan las rutinas y la personalizada)
function aplicarPlan(planes, nombre, adaptada) {
  const dias = diasActivos();
  if (rows().length) {
    S.hist = S.hist.concat(rows());
    S.logs = {};
    S.wk++;
  }
  DIAS_TODOS.forEach(([k]) => { S.plan[k] = []; });
  dias.forEach(d => {
    S.plan[d] = (planes[d] || []).map((e, j) => ({
      id: String(j),
      n: e.nombre,
      s: e.series,
      r: '',
      t: [e.reps ? e.reps + ' reps' : '', e.descanso ? 'descanso ' + e.descanso : '', e.nota || '']
           .filter(Boolean).join(' · ')
    }));
  });
  S.rutina = { nombre: nombre, adaptada: adaptada || '' };
  save();
  $('biblio').hidden = true;
  B = null;
  cur = dias[0] || 'lun';
  render();
  ub();
}

function aplicarRutina(i) {
  const r = RUTINAS[i];
  const dias = diasActivos();
  const planes = {};
  dias.forEach((d, k) => {
    const rd = r.dias_detalle[k];
    planes[d] = rd ? rd.ejercicios.map(e => ({
      nombre: e.nombre, series: parseSeries(e.series), reps: e.reps, descanso: e.descanso, nota: e.nota || ''
    })) : [];
  });
  aplicarPlan(planes, r.nombre, r.adaptada);
}

/* ---------- Rutina personalizada ---------- */

function iniciarPersonalizada() {
  B = { dias: diasActivos(), idx: 0, planes: {}, vista: 'dia', buscar: '', pend: null };
  B.dias.forEach(d => { B.planes[d] = []; });
  vistaDia();
}

function diaActual() { return B.dias[B.idx]; }

function vistaDia() {
  B.vista = 'dia';
  const d = diaActual();
  const lista = B.planes[d];
  const esUltimo = B.idx === B.dias.length - 1;
  const items = lista.length
    ? lista.map((e, i) => `<li><div><b>${esc(e.nombre)}</b><br><small>${e.series} × ${esc(e.reps || '—')}${e.descanso ? ' · ' + esc(e.descanso) : ''}</small></div><button class="mini" data-act="quitar" data-q="${i}">Quitar</button></li>`).join('')
    : '<p class="mu">Sin ejercicios todavía.</p>';

  mostrarBuilder(`
    <p class="mu">Personalizada · día ${B.idx + 1} de ${B.dias.length}</p>
    <h2>${nombreDia(d)}</h2>
    <ul class="bl">${items}</ul>
    <button class="sec" data-act="agregar">+ Agregar ejercicio</button>
    <div class="fila2">
      ${B.idx > 0 ? '<button class="sec" data-act="ant">‹ Día anterior</button>' : ''}
      ${esUltimo
        ? '<button class="pri" data-act="terminar">Terminar y aplicar</button>'
        : '<button class="pri" data-act="sig">Día siguiente ›</button>'}
    </div>
    <button class="cerrar" data-act="cancelar">Cancelar rutina</button>`);
}

function pintarResultados() {
  const q = norm(B.buscar.trim());
  const idx = CATALOGO.map((c, i) => i).filter(i => {
    const c = CATALOGO[i];
    return !q || norm(c.es).includes(q) || norm(c.en).includes(q) || norm(c.grupo).includes(q);
  });
  const mostrar = idx.slice(0, 80);
  let html = mostrar.map(i => {
    const c = CATALOGO[i];
    return `<button class="rcard" data-act="elegir" data-i="${i}"><b>${esc(c.es)}</b><small>${esc(c.grupo)} · ${esc(c.equipo)}</small></button>`;
  }).join('');
  if (idx.length > 80) html += `<p class="mu">Hay ${idx.length} coincidencias. Escribe más letras para afinar.</p>`;
  if (q && !CATALOGO.some(c => norm(c.es) === q)) {
    html += `<button class="sec" data-act="usar-texto">Usar "${esc(B.buscar.trim())}" como ejercicio</button>`;
  }
  if (!mostrar.length && !q) html = '<p class="mu">Escribe para buscar.</p>';
  $('bres').innerHTML = html;
}

function vistaBuscar() {
  B.vista = 'buscar';
  mostrarBuilder(`
    <p class="mu">${nombreDia(diaActual())}</p>
    <h2>Buscar ejercicio</h2>
    <input id="bq" class="busq" placeholder="Escribe para buscar…" value="${esc(B.buscar)}">
    <button class="sec" data-act="manual">✎ Escribir el nombre a mano</button>
    <div id="bres"></div>
    <button class="cerrar" data-act="volver-dia">‹ Volver al día</button>`);
  pintarResultados();
}

function leerForm() {
  if (B.vista !== 'form') return;
  const n = $('fnom'), r = $('freps'), d = $('fdes');
  if (n) B.pend.nombre = n.value.trim();
  if (r) B.pend.reps = r.value.trim();
  if (d) B.pend.descanso = d.value.trim();
}

function vistaForm() {
  B.vista = 'form';
  const p = B.pend;
  mostrarBuilder(`
    <p class="mu">${nombreDia(diaActual())}</p>
    <h2>Ejercicio</h2>
    <label class="campo">Nombre
      <input id="fnom" value="${esc(p.nombre)}" placeholder="Nombre del ejercicio">
    </label>
    <div class="srow"><span>Series</span><button class="mini" data-act="s-">−</button><b>${p.series}</b><button class="mini" data-act="s+">+</button></div>
    <label class="campo">Repeticiones
      <input id="freps" value="${esc(p.reps)}" placeholder="Ej. 8-12">
    </label>
    <label class="campo">Descanso
      <input id="fdes" value="${esc(p.descanso)}" placeholder="Ej. 90 seg">
    </label>
    <button class="pri" data-act="guardar">Guardar ejercicio</button>
    <button class="cerrar" data-act="volver-buscar">Cancelar</button>`);
}

function accion(act, b) {
  if (!B) return;
  const d = diaActual();
  switch (act) {
    case 'agregar': B.buscar = ''; return vistaBuscar();
    case 'volver-dia': return vistaDia();
    case 'volver-buscar': return vistaBuscar();
    case 'manual': B.pend = { nombre: '', series: 3, reps: '8-12', descanso: '90 seg' }; return vistaForm();
    case 'elegir': B.pend = { nombre: CATALOGO[+b.dataset.i].es, series: 3, reps: '8-12', descanso: '90 seg' }; return vistaForm();
    case 'usar-texto': B.pend = { nombre: B.buscar.trim(), series: 3, reps: '8-12', descanso: '90 seg' }; return vistaForm();
    case 's+': leerForm(); B.pend.series = Math.min(10, B.pend.series + 1); return vistaForm();
    case 's-': leerForm(); B.pend.series = Math.max(1, B.pend.series - 1); return vistaForm();
    case 'guardar':
      leerForm();
      if (!B.pend.nombre) return modal('Escribe el nombre del ejercicio.', [['Cerrar']]);
      B.planes[d].push({ ...B.pend });
      B.pend = null;
      return vistaDia();
    case 'quitar': B.planes[d].splice(+b.dataset.q, 1); return vistaDia();
    case 'ant': B.idx--; return vistaDia();
    case 'sig': B.idx++; return vistaDia();
    case 'terminar': return aplicarPlan(B.planes, 'Personalizada', '');
    case 'cancelar': {
      const hay = B.dias.some(x => B.planes[x].length);
      if (!hay) return mostrarLista();
      return ask('¿Cancelar la rutina personalizada? Se pierde lo que armaste.', () => mostrarLista());
    }
  }
}

/* ---------- Arranque ---------- */

function abrirBiblioteca() {
  mostrarLista();
  $('biblio').hidden = false;
}

function iniciarBiblioteca() {
  $('elegirrutina').onclick = abrirBiblioteca;
  $('bib-cancel').onclick = () => { $('biblio').hidden = true; };
  $('list').addEventListener('click', ev => {
    if (ev.target.closest('[data-go="biblio"]')) abrirBiblioteca();
  });

  $('biblio').addEventListener('input', ev => {
    if (ev.target.id === 'bq' && B) { B.buscar = ev.target.value; pintarResultados(); }
  });

  $('biblio').addEventListener('click', ev => {
    const t = ev.target;
    const card = t.closest('[data-r]');
    if (card) return card.dataset.r === 'custom' ? iniciarPersonalizada() : mostrarDetalle(+card.dataset.r);
    if (t.closest('#bib-aplicar')) return aplicarRutina(rutinaSel);
    if (t.closest('#bib-volver')) return mostrarLista();
    const b = t.closest('[data-act]');
    if (b) accion(b.dataset.act, b);
  });
}
