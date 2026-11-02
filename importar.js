/* Importar un JSON exportado por la app (historial + semana actual).
   Sirve para pasar tus datos de rutina5v5v5.html a index.html sin perder semanas. */

const inputImportar = document.createElement('input');
inputImportar.type = 'file';
inputImportar.accept = '.json,application/json';

$('im').onclick = () => inputImportar.click();

inputImportar.onchange = async () => {
  const f = inputImportar.files[0];
  inputImportar.value = '';
  if (!f) return;
  let obj;
  try {
    obj = JSON.parse(await f.text());
  } catch (e) {
    return modal('No pude leer ese archivo. Debe ser un JSON exportado desde la app.', [['Cerrar']]);
  }
  if (!Array.isArray(obj.historial) || !Array.isArray(obj.semana_actual)) {
    return modal('Ese JSON no tiene el formato de la app (faltan historial o semana_actual).', [['Cerrar']]);
  }
  ask('Esto reemplaza los datos guardados en ESTE navegador por los del archivo (semana ' + obj.semana + '). ¿Continuar?',
    () => importarJSON(obj));
};

function importarJSON(obj) {
  const nuevo = { wk: +obj.semana || 1, hist: obj.historial, logs: {}, plan: S.plan, u: S.u };
  let omitidas = 0;

  for (const r of obj.semana_actual) {
    const dk = Object.keys(D).find(k => D[k].n === r.dia);
    if (!dk) { omitidas++; continue; }

    const nombre = (r.ejercicio || '').trim();
    const lista = nuevo.plan[dk];
    let e = lista.find(x => x.n.trim() === nombre);
    if (!e) {
      // Ejercicio que no estaba en tu plan (por ejemplo, uno que agregaste o renombraste)
      const nid = Math.max(-1, ...lista.map(x => +x.id)) + 1;
      e = { id: String(nid), n: nombre, s: 1, r: '', t: '' };
      lista.push(e);
    }

    const sn = +r.serie;
    if (sn > e.s) e.s = Math.min(sn, 10);

    const k = dk + '|' + e.id + '|' + (sn - 1);
    const l = {};
    if (r.kg !== '' && r.kg != null) l.w = Number(r.kg);
    if (r.reps !== '' && r.reps != null) l.r = Number(r.reps);
    if (r.rir !== '' && r.rir != null) l.q = String(r.rir);
    if (r.unidad) l.u = r.unidad;
    if (r.completada === 'sí') { l.d = true; l.t = r.fecha; }
    if (Object.keys(l).length) nuevo.logs[k] = l;
  }

  S = nuevo;
  save();
  render();
  ub();
  modal('Importado: semana ' + S.wk + ', ' + S.hist.length + ' series de semanas anteriores y ' +
    Object.keys(S.logs).length + ' series de la semana actual.' +
    (omitidas ? ' Se omitieron ' + omitidas + ' filas con día desconocido.' : ''), [['Cerrar']]);
}
