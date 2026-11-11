/* Biblioteca de rutinas: elegir una rutina y armar los días de entreno.
   Antes de aplicarla, la semana actual se guarda en el historial (no se pierde nada). */

let rutinaSel = null;

function parseSeries(v) {
  return Math.max(1, Math.min(10, parseInt(String(v).split('-')[0], 10) || 1));
}

function mostrarLista() {
  const actual = S.rutina ? S.rutina.nombre : '';
  $('bib-lista').innerHTML = '<h2>Elige tu rutina</h2>' +
    '<p class="mu">Se arma sola con tus días de entreno.</p>' +
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
  const nombres = Object.fromEntries(DIAS_TODOS);

  const filas = dias.map((d, k) => {
    const rd = r.dias_detalle[k];
    return `<li><b>${nombres[d]}</b>: ${rd ? esc(rd.nombre) : '<span class="mu">sin día de rutina (descanso)</span>'}</li>`;
  }).join('');

  let aviso = '';
  if (r.dias_detalle.length > dias.length) {
    aviso = `Esta rutina tiene ${r.dias_detalle.length} días y marcaste ${dias.length}. Se quedan fuera: ` +
            r.dias_detalle.slice(dias.length).map(d => esc(d.nombre)).join(', ') + '.';
  } else if (r.dias_detalle.length < dias.length) {
    aviso = 'Tienes más días que la rutina; los días sobrantes quedan vacíos.';
  }
  if (rows().length) aviso += (aviso ? ' ' : '') + 'Tu semana actual se guardará en el historial antes de aplicar la rutina.';

  $('bib-detalle').innerHTML = `
    <h2>${esc(r.nombre)}</h2>
    <ul class="bl">${filas}</ul>
    ${aviso ? `<p class="mu">${aviso}</p>` : ''}
    ${r.nota ? `<p class="mu">${esc(r.nota)}</p>` : ''}
    <button id="bib-aplicar">Aplicar rutina</button>
    <button id="bib-volver">Volver</button>`;
  $('bib-lista').hidden = true;
  $('bib-detalle').hidden = false;
}

function aplicarRutina(i) {
  const r = RUTINAS[i];
  const dias = diasActivos();

  // Guardar la semana actual en el historial (igual que "Iniciar nueva semana")
  if (rows().length) {
    S.hist = S.hist.concat(rows());
    S.logs = {};
    S.wk++;
  }

  // Limpiar el plan y poner los días de la rutina en los días de entreno
  DIAS_TODOS.forEach(([k]) => { S.plan[k] = []; });
  dias.forEach((d, k) => {
    const rd = r.dias_detalle[k];
    if (!rd) return;
    S.plan[d] = rd.ejercicios.map((e, j) => ({
      id: String(j),
      n: e.nombre,
      s: parseSeries(e.series),
      r: '',
      t: [e.reps ? e.reps + ' reps' : '', e.descanso ? 'descanso ' + e.descanso : '', e.nota]
           .filter(Boolean).join(' · ')
    }));
  });

  S.rutina = { nombre: r.nombre, adaptada: r.adaptada };
  save();
  $('biblio').hidden = true;
  cur = dias[0] || 'lun';
  render();
  ub();
}

function abrirBiblioteca() {
  mostrarLista();
  $('biblio').hidden = false;
}

function iniciarBiblioteca() {
  $('elegirrutina').onclick = abrirBiblioteca;
  $('bib-cancel').onclick = () => { $('biblio').hidden = true; };
  $('biblio').addEventListener('click', ev => {
    const t = ev.target;
    const card = t.closest('[data-r]');
    if (card) return mostrarDetalle(+card.dataset.r);
    if (t.closest('#bib-aplicar')) return aplicarRutina(rutinaSel);
    if (t.closest('#bib-volver')) return mostrarLista();
  });
}
