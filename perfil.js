/* Perfil local: foto, nombre, descripción, ejercicio favorito y top 4 canciones.
   Las canciones se buscan en Apple Music (API pública de iTunes). Se guardan en el navegador
   de este teléfono (clave perfil_v1), separado de tus registros. */

const PKEY = 'perfil_v1';
const EAPPLE = /^https:\/\/music\.apple\.com\/.+/;
let portadaIdx = null;
const editando = new Set();   // canciones cuyo enlace se está cambiando (no se guarda)
const resultados = {};        // resultados de búsqueda por canción (no se guarda)
const consultas = {};         // texto buscado por canción (no se guarda)

const esValido = l => EAPPLE.test((l || '').trim());

function perfilVacio() {
  return {
    nombre: '', descripcion: '', foto: '',
    canciones: [0, 1, 2, 3].map(() => ({ titulo: '', artista: '', portada: '', link: '' }))
  };
}

function cargarPerfil() {
  try {
    const p = JSON.parse(localStorage.getItem(PKEY) || 'null');
    return p ? Object.assign(perfilVacio(), p) : perfilVacio();
  } catch (e) {
    return perfilVacio();
  }
}

let perfil = cargarPerfil();

function guardarPerfil() {
  try {
    localStorage.setItem(PKEY, JSON.stringify(perfil));
  } catch (e) {
    modal('No hay espacio para guardar. Prueba con una foto más pequeña.', [['Cerrar']]);
  }
}

// Reduce la imagen antes de guardarla para que no ocupe mucho espacio
function reducirImagen(file, max) {
  return new Promise((ok, fail) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * s);
      c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      ok(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = fail;
    img.src = URL.createObjectURL(file);
  });
}

// Ejercicio con más series (usa los datos ya corregidos de progreso.js)
function favorito() {
  const cuenta = {};
  datosLimpios().forEach(r => { cuenta[r.ejercicio] = (cuenta[r.ejercicio] || 0) + 1; });
  const top = Object.entries(cuenta).sort((a, b) => b[1] - a[1])[0];
  return top ? { nombre: top[0], n: top[1] } : null;
}

// Safari del iPhone bloquea fetch hacia Apple (CORS). Esta versión pide los datos
// con una etiqueta <script>, que no tiene esa restricción, usando el parámetro callback.
function buscarJsonp(q) {
  return new Promise((ok, fail) => {
    const cb = 'itunesCb' + Date.now();
    const s = document.createElement('script');
    const limpiar = () => { delete window[cb]; s.remove(); };
    const t = setTimeout(() => { limpiar(); fail(new Error('tiempo agotado')); }, 8000);
    window[cb] = d => { clearTimeout(t); limpiar(); ok(d); };
    s.onerror = () => { clearTimeout(t); limpiar(); fail(new Error('no se pudo cargar desde Apple')); };
    s.src = 'https://itunes.apple.com/search?media=music&entity=song&limit=5&callback=' + cb +
            '&term=' + encodeURIComponent(q);
    document.body.appendChild(s);
  });
}

// Busca canciones en Apple Music (API pública de iTunes, sin clave)
async function buscarCancion(i) {
  const q = (document.querySelector(`input[data-q="${i}"]`)?.value || '').trim();
  if (!q) return;
  consultas[i] = q;
  try {
    const d = await buscarJsonp(q);
    resultados[i] = d.results || [];
    if (!resultados[i].length) modal('No encontré esa canción en Apple Music. Prueba con otro nombre o escríbela a mano.', [['Cerrar']]);
  } catch (e) {
    modal('No pude buscar ahora. Detalle: ' + (e && e.message ? e.message : 'sin detalle') + '. Si el detalle dice Failed to fetch, el teléfono está bloqueando la búsqueda; avísame el texto exacto.', [['Cerrar']]);
  }
  renderPerfil();
}

// Al elegir un resultado se llenan título, artista, portada y enlace
function elegirCancion(i, j) {
  const t = resultados[i][j];
  const c = perfil.canciones[i];
  c.titulo = t.trackName || c.titulo;
  c.artista = t.artistName || c.artista;
  c.portada = (t.artworkUrl100 || '').replace('100x100bb', '300x300bb');
  c.link = t.trackViewUrl || '';
  delete resultados[i];
  delete consultas[i];
  editando.delete(i);
  guardarPerfil();
  renderPerfil();
}

function renderPerfil() {
  $('pf-foto').innerHTML = perfil.foto
    ? `<img src="${perfil.foto}" alt="">`
    : `<span>${esc((perfil.nombre || '?').charAt(0).toUpperCase())}</span>`;
  $('pf-nombre').value = perfil.nombre;
  $('pf-desc').value = perfil.descripcion;

  const f = favorito();
  $('pf-fav').textContent = f ? `${f.nombre} · ${f.n} series` : 'Aún no hay series registradas.';

  $('pf-cancs').innerHTML = perfil.canciones.map((c, i) => {
    const bloqueado = esValido(c.link) && !editando.has(i);

    const lista = (resultados[i] || []).map((t, j) => `
      <button class="resultado" data-elegir="${i}:${j}">
        <img src="${esc((t.artworkUrl100 || '').replace('100x100bb', '60x60bb'))}" alt="">
        <span><b>${esc(t.trackName)}</b><small>${esc(t.artistName)}</small></span>
      </button>`).join('');

    const bloque = bloqueado
      ? `<div class="fila">
           <a class="chip" href="${esc(c.link.trim())}" target="_blank" rel="noopener">Abrir en Apple Music</a>
           <button class="chip alt" data-cambiar="${i}">Cambiar</button>
         </div>`
      : `<div class="fila">
           <input data-q="${i}" placeholder="Buscar canción en Apple Music" value="${esc(consultas[i] || '')}">
           <button class="chip alt" data-buscar="${i}">Buscar</button>
         </div>
         <div class="resultados">${lista}</div>
         <input data-i="${i}" data-campo="link" placeholder="o pega el enlace de Apple Music" value="${esc(c.link)}">
         ${c.link && !esValido(c.link) ? '<span class="mu hint">Debe ser un enlace de music.apple.com</span>' : ''}`;

    return `
    <div class="cancion">
      <div class="thumb">${c.portada ? `<img src="${esc(c.portada)}" alt="">` : '♪'}</div>
      <div class="cf">
        <input data-i="${i}" data-campo="titulo" placeholder="Canción ${i + 1}" value="${esc(c.titulo)}">
        <input data-i="${i}" data-campo="artista" placeholder="Artista" value="${esc(c.artista)}">
        ${bloque}
        <div class="fila">
          <button class="chip" data-cov="${i}">Portada</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// Mostrar / ocultar la pantalla de perfil
$('perfilbtn').onclick = () => {
  const abrir = $('perfil').hidden;
  $('perfil').hidden = !abrir;
  $('list').style.display = abrir ? 'none' : '';
  $('tabs').style.display = abrir ? 'none' : '';
  $('prog').hidden = true;
  $('vp').textContent = 'Ver progreso';
  if (abrir) { perfil = cargarPerfil(); renderPerfil(); scrollTo(0, 0); }
};

// Si abres Ver progreso desde el menú, se oculta el perfil
$('vp').addEventListener('click', () => { $('perfil').hidden = true; });

// Foto de perfil
$('pf-btnfoto').onclick = () => $('pf-fotoin').click();
$('pf-fotoin').onchange = async ev => {
  const f = ev.target.files[0];
  ev.target.value = '';
  if (!f) return;
  perfil.foto = await reducirImagen(f, 256);
  guardarPerfil();
  renderPerfil();
};

// Botones dentro de las canciones
$('pf-cancs').addEventListener('click', ev => {
  const t = ev.target;
  const buscar = t.closest('[data-buscar]');
  if (buscar) return buscarCancion(+buscar.dataset.buscar);
  const elegir = t.closest('[data-elegir]');
  if (elegir) {
    const [i, j] = elegir.dataset.elegir.split(':').map(Number);
    return elegirCancion(i, j);
  }
  const cambiar = t.closest('[data-cambiar]');
  if (cambiar) {
    editando.add(+cambiar.dataset.cambiar);
    renderPerfil();
    return;
  }
  const cov = t.closest('[data-cov]');
  if (cov) {
    portadaIdx = +cov.dataset.cov;
    $('pf-portadain').click();
  }
});

$('pf-portadain').onchange = async ev => {
  const f = ev.target.files[0];
  ev.target.value = '';
  if (!f || portadaIdx == null) return;
  perfil.canciones[portadaIdx].portada = await reducirImagen(f, 200);
  guardarPerfil();
  renderPerfil();
};

// Campos de texto: se guardan al escribir
$('perfil').addEventListener('input', ev => {
  const t = ev.target;
  if (t.id === 'pf-nombre') perfil.nombre = t.value;
  else if (t.id === 'pf-desc') perfil.descripcion = t.value;
  else if (t.dataset.campo) perfil.canciones[+t.dataset.i][t.dataset.campo] = t.value;
  else return;
  guardarPerfil();
});

// Al salir de un campo: si el enlace es válido, se oculta y aparece "Cambiar"
$('perfil').addEventListener('change', ev => {
  const t = ev.target;
  if (t.dataset.campo === 'link') {
    if (esValido(t.value)) editando.delete(+t.dataset.i);
    renderPerfil();
    return;
  }
  if (t.dataset.campo || t.id === 'pf-nombre') renderPerfil();
});
