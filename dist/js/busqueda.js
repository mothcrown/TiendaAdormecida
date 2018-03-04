'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global $ React moldeProductos listaProductos */

// JSONs simplitos que nos va a ayudar muchito
var apiKey = {
  eBay: 'MarcosDa-TiendaAd-PRD-0df64df3e-523ae795',
  Walmart: 'rrxgpza76z7ea5r2db73jtkz'
};

var urlBasica = {
  ebay: 'http://svcs.ebay.com/services/search/FindingService/v1?',
  walmart: 'http://api.walmartlabs.com/v1/search?callback=?'
};

var idCategorias = {
  camaras: {
    eBay: '31388',
    Walmart: '3944_133277_4468'
  },
  relojes: {
    eBay: '31387',
    Walmart: '3891_3906'
  },
  tablets: {
    eBay: '171485',
    Walmart: '3944_1078524'
  }
};

function buscaWalmart(keywords, idCategoria) {
  $.getJSON(urlBasica.walmart, {
    query: keywords,
    apikey: apiKey.Walmart,
    categoryId: idCategoria,
    format: 'json',
    limit: 20
  }).done(function (response) {
    moldeProductos(response.items, 'Walmart');
  });
}

/*
function devuelveProductos(response) {
  const resultados = moldeProductos(response.searchResult, 'eBay');
  return resultados;
}
*/

function buscaEBay(keywords, idCategoria) {
  /*
  $.ajax({
    url: 'http://open.api.ebay.com/shopping?callname=FindItemsAdvanced',
    type: 'POST',
    dataType: 'JSONP',
    jsonp: 'callbackname',
    crossDomain: true,
    data: {
      appid: apiKey.eBay,
      version: '771',
      siteid: '0',
      requestencoding: 'JSON',
      responseencoding: 'JSON',
      QueryKeywords: keywords,
      MaxEntries: '10',
      callback: true,
    },
    success: function (response) {
      moldeProductos(response.searchResult, 'eBay');
    },
  })
  */

  $.ajax({
    url: urlBasica.ebay,
    type: 'POST',
    jsonp: 'callback',
    dataType: 'JSONP',
    data: {
      'OPERATION-NAME': 'findItemsAdvanced',
      'SERVICE-VERSION': '1.0.0',
      'SECURITY-APPNAME': apiKey.eBay,
      'GLOBAL-ID': 'EBAY-US',
      'RESPONSE-DATA-FORMAT': 'JSON',
      'REST-PAYLOAD': true,
      keywords: keywords,
      categoryId: idCategoria,
      // siteid: '0',
      'paginationInput.entriesPerPage': 10
    },
    success: function success(response) {
      console.warn(response);
      moldeProductos(response.findItemsAdvancedResponse[0].searchResult[0].item, 'eBay');
    }
  });

  /*
  $.getJSON(urlBasica.ebay, {
    'OPERATION-NAME': 'findItemsAdvanced',
    'SERVICE-VERSION': '1.0.0',
    'SECURITY-APPNAME': apiKey.eBay,
    'GLOBAL-ID': 'EBAY-US',
    'RESPONSE-DATA-FORMAT': 'JSON',
    'REST-PAYLOAD': 'true',
    'paginationInput.entriesPerPage': 10,
    keywords,
    categoryId: idCategoria,
  })
    .done(function (response) {
      moldeProductos(response.searchResult, 'eBay');
    });
  */
}

function buscaProductos(keywords, categoria) {
  var busqueda = keywords;
  // Quita espacios y los cambia por '%20'
  busqueda = encodeURIComponent(busqueda.trim());
  buscaWalmart(busqueda, idCategorias[categoria].Walmart);
  buscaEBay(busqueda, idCategorias[categoria].eBay);
}

var BusquedaAvanzada = function (_React$Component) {
  _inherits(BusquedaAvanzada, _React$Component);

  function BusquedaAvanzada() {
    _classCallCheck(this, BusquedaAvanzada);

    return _possibleConstructorReturn(this, (BusquedaAvanzada.__proto__ || Object.getPrototypeOf(BusquedaAvanzada)).apply(this, arguments));
  }

  _createClass(BusquedaAvanzada, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'a',
        { href: '#' },
        'Avanzada'
      );
    }
  }]);

  return BusquedaAvanzada;
}(React.Component);

var BotonBusqueda = function (_React$Component2) {
  _inherits(BotonBusqueda, _React$Component2);

  function BotonBusqueda() {
    _classCallCheck(this, BotonBusqueda);

    return _possibleConstructorReturn(this, (BotonBusqueda.__proto__ || Object.getPrototypeOf(BotonBusqueda)).apply(this, arguments));
  }

  _createClass(BotonBusqueda, [{
    key: 'handleClick',
    value: function handleClick() {
      var keywords = $('#inputBusqueda').val();
      var categoria = $('#selectBusqueda').val();
      buscaProductos(keywords, categoria);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { id: 'botonBusqueda', onClick: this.handleClick },
        React.createElement('i', { className: 'fa fa-search' }),
        'Buscar'
      );
    }
  }]);

  return BotonBusqueda;
}(React.Component);

var SelectBusqueda = function (_React$Component3) {
  _inherits(SelectBusqueda, _React$Component3);

  function SelectBusqueda() {
    _classCallCheck(this, SelectBusqueda);

    return _possibleConstructorReturn(this, (SelectBusqueda.__proto__ || Object.getPrototypeOf(SelectBusqueda)).apply(this, arguments));
  }

  _createClass(SelectBusqueda, [{
    key: 'render',
    value: function render() {
      var categorias = this.props.categorias;

      // opt: camaras, categorias[opt] = 'Cámaras'

      var option = Object.keys(categorias).map(function (opt) {
        return React.createElement(
          'option',
          { value: opt },
          categorias[opt]
        );
      });
      return React.createElement(
        'select',
        { id: 'selectBusqueda' },
        option
      );
    }
  }]);

  return SelectBusqueda;
}(React.Component);

SelectBusqueda.contextType = {
  categorias: React.PropTypes.object
};

SelectBusqueda.defaultProps = {
  categorias: {
    camaras: 'Cámaras',
    relojes: 'Relojes',
    tablets: 'Tablets'
  }
};

var InputBusqueda = function (_React$Component4) {
  _inherits(InputBusqueda, _React$Component4);

  function InputBusqueda() {
    _classCallCheck(this, InputBusqueda);

    return _possibleConstructorReturn(this, (InputBusqueda.__proto__ || Object.getPrototypeOf(InputBusqueda)).apply(this, arguments));
  }

  _createClass(InputBusqueda, [{
    key: 'render',
    value: function render() {
      return React.createElement('input', { id: 'inputBusqueda', type: 'text', placeholder: 'Busca ofertas' });
    }
  }]);

  return InputBusqueda;
}(React.Component);

var Busqueda = function (_React$Component5) {
  _inherits(Busqueda, _React$Component5);

  function Busqueda() {
    _classCallCheck(this, Busqueda);

    return _possibleConstructorReturn(this, (Busqueda.__proto__ || Object.getPrototypeOf(Busqueda)).apply(this, arguments));
  }

  _createClass(Busqueda, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(InputBusqueda, null),
        React.createElement(SelectBusqueda, null),
        React.createElement(BotonBusqueda, null),
        React.createElement(BusquedaAvanzada, null)
      );
    }
  }]);

  return Busqueda;
}(React.Component);