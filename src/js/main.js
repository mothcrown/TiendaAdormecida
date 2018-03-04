/* global $ React Busqueda buscaDefecto idCategorias*/

function preparaDialogs() {
  $('#loginDialog').dialog({
    title: 'Regístrate en TiendaAdormecida',
    width: 500,
    height: 400,
  });
  $('#loginDialog').dialog('close');
}

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

$(document).ready(() => {
  React.render(<Busqueda />, document.getElementById('barraBusqueda'));
  React.render(<Login />, document.getElementById('login'));
  preparaDialogs();
  activaCategorias();
  buscaDefecto(idCategorias.camaras.eBay);

});
