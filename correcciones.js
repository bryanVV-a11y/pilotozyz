/* Correcciones confirmadas por el usuario.
   Tus datos guardados NO se modifican: la gráfica aplica estas reglas al leerlos.
   Para agregar una corrección, copia una línea y cambia los valores.
   Los campos semana, dia y serie son opcionales: si no los pones, la regla aplica a todos. */

const CORRECCIONES = [
  {semana:1, dia:"Lunes", ejercicio:"Abdomen en máquina", serie:[1,2], kg:68, motivo:"error de dedo"},
  {semana:1, dia:"Miércoles", ejercicio:"Elevaciones laterales en máquina", kg:64, motivo:"error de dedo"},
  {semana:2, dia:"Lunes", ejercicio:"Abdomen en máquina", serie:2, reps:8, rir:2, motivo:"confirmado por usuario"},
  {semana:3, dia:"Miércoles", ejercicio:"Abdomen en máquina", serie:3, reps:8, rir:2, motivo:"confirmado por usuario"},
  {semana:3, dia:"Martes", ejercicio:"Peck deck inverso (hombro posterior)", serie:1, reps:8, rir:2, motivo:"confirmado por usuario"},
  {semana:4, dia:"Viernes", ejercicio:"Press inclinado en Smith", kg:35, motivo:"error de dedo"},
  {semana:4, dia:"Viernes", ejercicio:"Curl martillo", rir:1, motivo:"confirmado por usuario"}
];

/* Series que no se hicieron aunque tengan datos. Se excluyen de la gráfica. */
const SERIES_EXCLUIDAS = [
  {semana:3, dia:"Martes", ejercicio:"Peck deck inverso (hombro posterior)", serie:2, motivo:"no realizada"}
];

/* Unidad correcta de cada ejercicio. Si hay dos reglas que coinciden, gana la de abajo. */
const UNIDADES = [
  {ejercicio:"Jalón al pecho", unidad:"lb"},
  {ejercicio:"Curl martillo", unidad:"lb"},
  {ejercicio:"Curl martillo", semana:1, dia:"Viernes", unidad:"kg"}
];

/* Nombres que se unifican con otro ejercicio. */
const NOMBRES = {
  "Peck deck a una mano": "Peck deck"
};
