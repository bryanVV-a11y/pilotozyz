/* Perfil local: foto, nombre, descripción, ejercicio favorito y top 4 canciones.
   Se guarda en el navegador de este teléfono (clave perfil_v1), separado de tus registros. */

const PKEY = 'perfil_v1';
const ESPOTIFY = /^https:\/\/open\.spotify\.com\//;
const ESOUNDCLOUD = /^https:\/\/(www\.|m\.)?soundcloud\.com\/.+/;
let portadaIdx = null;

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

// Trae título, artista y portada desde SoundCloud (servicio oEmbed, público)
async function datosSoundCloud(i) {
  const c = perfil.canciones[i];
  try {
    const r = await fetch('https://soundcloud.com/oembed?format=json&url=' + encodeURIComponent(c.link.trim()));
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    c.titulo = d.title || c.titulo;
    c.artista = d.author_name || c.artista;
    c.portada = d.thumbnail_url || c.portada;
    guardarPerfil();
  } catch (e) {
    modal('No pude traer los datos de esa canción. Revisa que sea pública o escríbelos a mano.', [['Cerrar']]);
  }
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
    const q = encodeURIComponent(`${c.titulo} ${c.artista}`.trim());
    let extra = '';
    if (ESOUNDCLOUD.test(c.link)) {
      extra = `<iframe src="https://w.soundcloud.com/player/?url=${encodeURIComponent(c.link.trim())}&auto_play=false&hide_related=true&visual=false" height="166" allow="autoplay"></iframe>
               <a class="chip alt" href="${esc(c.link)}" target="_blank" rel="noopener">Abrir en SoundCloud</a>`;
    } else if (ESPOTIFY.test(c.link)) {
      extra = `<a class="chip" href="${esc(c.link)}" target="_blank" rel="noopener">Abrir en Spotify</a>`;
    } else if (c.link) {
      extra = `<span class="mu hint">Pon un enlace de soundcloud.com o open.spotify.com</span>`;
    }
    return `
    <div class="cancion">
      <div class="thumb">${c.portada ? `<img src="${esc(c.portada)}" alt="">` : '♪'}</div>
      <div class="cf">
        <input data-i="${i}" data-campo="titulo" placeholder="Canción ${i + 1}" value="${esc(c.titulo)}">
        <input data-i="${i}" data-campo="artista" placeholder="Artista" value="${esc(c.artista)}">
        <input data-i="${i}" data-campo="link" placeholder="Enlace de SoundCloud o Spotify" value="${esc(c.link)}">
        <div class="fila">
          <button class="chip" data-cov="${i}">Portada</button>
          <a class="chip alt" href="https://soundcloud.com/search/sounds?q=${q}" target="_blank" rel="noopener">Buscar en SoundCloud</a>
          <a class="chip alt" href="https://open.spotify.com/search/${q}" target="_blank" rel="noopener">Buscar en Spotify</a>
        </div>
        <div class="fila">${extra}</div>
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

// Portada de cada canción
$('pf-cancs').addEventListener('click', ev => {
  const b = ev.target.closest('[data-cov]');
  if (!b) return;
  portadaIdx = +b.dataset.cov;
  $('pf-portadain').click();
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

// Al salir de un campo: si pegaste un enlace de SoundCloud, se llenan los datos solos
$('perfil').addEventListener('change', async ev => {
  const t = ev.target;
  if (t.dataset.campo === 'link' && ESOUNDCLOUD.test(t.value.trim())) {
    await datosSoundCloud(+t.dataset.i);
    return;
  }
  if (t.dataset.campo || t.id === 'pf-nombre') renderPerfil();
});
