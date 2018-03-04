/* global $ React Busqueda */

$(document).ready(() => {
  React.render(<Busqueda />, document.getElementById('barraBusqueda'));
  React.render(<Login />, document.getElementById('login'));
});
