/* global $ React Busqueda buscaDefecto idCategorias comprarDesdeDetalles */

function preparaDialogs() {
  $('#loginDialog').dialog({
    autoOpen: false,
    title: 'Regístrate en TiendaAdormecida',
    width: 500,
    height: 400,
  });

  $('#comprarDialog').dialog({
    autoOpen: false,
    title: '¡Producto comprado!',
    width: 500,
    height: 400,
  });

  $('#detalleDialog').dialog({
    autoOpen: false,
    title: 'Información sobre el producto',
    width: 500,
    height: 400,
  });
  $('#avanzadaDialog').dialog({
    autoOpen: false,
    title: 'Zzzzzzzz...',
    width: 500,
    height: 400,
  });
  $('#ayudaDialog').dialog({
    autoOpen: false,
    title: 'Ayuda!',
    width: 500,
    height: 400,
  });
}

/**
 * Botones de diálogos
 */
function activaBotones() {
  $('#botonComprar').click(() => {
    $('#comprarDialog').dialog('close');
  });
  $('#detalleComprar').click(() => {
    const nombre = $('#detalleNombre').text();
    const precio = $('#detallePrecio').text();
    comprarDesdeDetalles(nombre, precio);
  });
  $('#detalleVolver').click(() => {
    $('#detalleDialog').dialog('close');
  });
  $('#botonAyuda').click(() => {
    $('#ayudaDialog').dialog('close');
  });
}

/**
 * Búsquedas por defecto a un click de distancia
 */
function activaCategorias() {
  $('.camaras').click(() => {
    buscaDefecto(idCategorias.camaras.eBay);
  });
  $('.relojes').click(() => {
    buscaDefecto(idCategorias.relojes.eBay);
  });
  $('.tablets').click(() => {
    buscaDefecto(idCategorias.tablets.eBay);
  });
}

/**
 * No habrá filtros, pero hay chistes.
 */
function activaAyuda() {
  $('#ayuda').click(() => {
    $('#ayudaDialog').dialog('open');
  });
}

/**
 * El corazón de la bestia... adormecida.
 */
$(document).ready(() => {
  React.render(<Busqueda />, document.getElementById('barraBusqueda'));
  React.render(<Login />, document.getElementById('login'));
  preparaDialogs();
  activaBotones();
  activaCategorias();
  activaAyuda();
  buscaDefecto(idCategorias.camaras.eBay);
});
