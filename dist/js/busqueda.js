"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global React */

var BusquedaAvanzada = function (_React$Component) {
  _inherits(BusquedaAvanzada, _React$Component);

  function BusquedaAvanzada() {
    _classCallCheck(this, BusquedaAvanzada);

    return _possibleConstructorReturn(this, (BusquedaAvanzada.__proto__ || Object.getPrototypeOf(BusquedaAvanzada)).apply(this, arguments));
  }

  _createClass(BusquedaAvanzada, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "a",
        { href: "#" },
        "Avanzada"
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
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { id: "botonBusqueda" },
        React.createElement("i", { className: "fa fa-search" }),
        " Buscar"
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
    key: "render",
    value: function render() {
      var categorias = this.props.categorias;

      // opt: camaras, categorias[opt] = 'Cámaras'

      var option = Object.keys(categorias).map(function (opt) {
        return React.createElement(
          "option",
          { value: opt },
          categorias[opt]
        );
      });
      return React.createElement(
        "select",
        { id: "selectBusqueda" },
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
    key: "render",
    value: function render() {
      return React.createElement("input", { id: "inputBusqueda", type: "text", placeholder: "Busca ofertas" });
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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
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