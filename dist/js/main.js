'use strict';

/* global $ React Busqueda */

$(document).ready(function () {
  React.render(React.createElement(Busqueda, null), document.getElementById('barraBusqueda'));
  React.render(React.createElement(Login, null), document.getElementById('login'));
});