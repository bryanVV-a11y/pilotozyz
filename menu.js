/* Menú de acciones (☰): abre y cierra el panel de Datos y Rutina */

$('menu').onclick = () => { $('panel').hidden = !$('panel').hidden; };

// Al pulsar cualquier acción del panel, el panel se cierra
$('panel').addEventListener('click', ev => {
  if (ev.target.closest('button')) $('panel').hidden = true;
});
