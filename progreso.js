/* Gráfica de progreso: lee tus datos guardados y aplica las reglas de correcciones.js */

const CONV_LB = 0.45359237;
let chartProg = null;

const numero = v => (v === '' || v == null) ? null : parseFloat(v);

const coincide = (c, sem, dia, ex, serie) =>
  (c.semana === undefined || c.semana === sem) &&
  (c.dia === undefined || c.dia === dia) &&
  c.ejercicio === ex &&
  (c.serie === undefined || (Array.isArray(c.serie) ? c.serie.includes(serie) : c.serie === serie));

function datosLimpios() {
  const out = [];
  for (const r of S.hist.concat(rows())) {
    const nombre = (r.ejercicio || '').trim();
    const ex = NOMBRES[nombre] || nombre;
    const sem = +r.semana, dia = r.dia, serie = +r.serie;

    if (SERIES_EXCLUIDAS.some(c => coincide(c, sem, dia, ex, serie))) continue;

    let kg = numero(r.kg), reps = numero(r.reps);
    if (kg == null && reps == null) continue;

    let unidad = r.unidad || S.u || 'kg';
    for (const u of UNIDADES) {
      if (u.ejercicio === ex && (u.semana === undefined || u.semana === sem) && (u.dia === undefined || u.dia === dia)) {
        unidad = u.unidad;
      }
    }
    if (kg != null && unidad === 'lb') kg = kg * CONV_LB;

    for (const c of CORRECCIONES) {
      if (coincide(c, sem, dia, ex, serie)) {
        if (c.kg !== undefined) kg = c.kg;
        if (c.reps !== undefined) reps = c.reps;
      }
    }

    out.push({ semana: sem, dia, ejercicio: ex, serie, kg, reps });
  }
  return out;
}

function llenarEjProg() {
  const datos = datosLimpios();
  let opts;
  if ($('vis').value === 'todos') {
    opts = [...new Set(datos.map(r => r.ejercicio))].sort()
      .map(e => `<option value="${esc(e)}">${e}</option>`);
  } else {
    opts = [...new Set(datos.map(r => r.ejercicio + '|' + r.dia))].sort()
      .map(p => { const [e, d] = p.split('|'); return `<option value="${esc(p)}">${e} · ${d}</option>`; });
  }
  $('ex').innerHTML = opts.join('');
}

function renderProg() {
  const key = $('ex').value;
  if (!key) { $('tbl').innerHTML = ''; return; }

  const datos = datosLimpios();
  const met = $('met').value;

  let rs;
  if ($('vis').value === 'todos') {
    rs = datos.filter(r => r.ejercicio === key);
  } else {
    const [e, d] = key.split('|');
    rs = datos.filter(r => r.ejercicio === e && r.dia === d);
  }

  const ultima = datos.length ? Math.max(...datos.map(r => r.semana)) : 0;
  const etiqueta = met === 'max' ? 'Carga máxima (kg)' : 'Volumen (kg × reps)';
  const pts = [];
  for (let s = 1; s <= ultima; s++) {
    const q = rs.filter(r => r.semana === s);
    let val = null;
    if (met === 'max') {
      const kgs = q.map(r => r.kg).filter(v => v != null);
      if (kgs.length) val = Math.round(Math.max(...kgs) * 10) / 10;
    } else {
      const vs = q.filter(r => r.kg != null && r.reps != null).map(r => r.kg * r.reps);
      if (vs.length) val = Math.round(vs.reduce((a, b) => a + b, 0));
    }
    pts.push({ s, val, n: q.length });
  }

  $('tbl').innerHTML = `<tr><th>Semana</th><th>${etiqueta}</th><th>Series</th></tr>` +
    pts.map(p => `<tr><td>Semana ${p.s}</td><td>${p.val ?? '—'}</td><td>${p.n}</td></tr>`).join('');

  if (typeof Chart === 'undefined') {
    $('pmsg').textContent = 'No cargó la librería de gráficas. Revisa tu conexión a internet.';
    return;
  }
  $('pmsg').textContent = '';
  if (chartProg) chartProg.destroy();
  chartProg = new Chart($('grafica'), {
    type: 'line',
    data: {
      labels: pts.map(p => 'Sem ' + p.s),
      datasets: [{
        label: etiqueta,
        data: pts.map(p => p.val),
        borderColor: '#E5E5E5',
        backgroundColor: '#FFFFFF',
        pointRadius: 5,
        tension: 0.2
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#E5E5E5' } } },
      scales: {
        x: { ticks: { color: '#A0A0A0' }, grid: { color: '#222' } },
        y: { ticks: { color: '#A0A0A0' }, grid: { color: '#222' } }
      }
    }
  });
}

if (typeof Chart !== 'undefined') Chart.defaults.color = '#A0A0A0';

$('vis').addEventListener('change', () => { llenarEjProg(); renderProg(); });
$('ex').addEventListener('change', renderProg);
$('met').addEventListener('change', renderProg);

$('vp').addEventListener('click', () => {
  const abrir = $('prog').hidden;
  $('prog').hidden = !abrir;
  $('list').style.display = abrir ? 'none' : '';
  $('tabs').style.display = abrir ? 'none' : '';
  $('vp').textContent = abrir ? 'Volver a rutina' : 'Ver progreso';
  if (abrir) { llenarEjProg(); renderProg(); scrollTo(0, 0); }
});
