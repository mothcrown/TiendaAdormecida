'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global React */

/** Representa un producto.
* @author Joel Alberto Armas Reyes.
* @since 16/01/2017.
*/

/** Constructor.
 * @param {*} id
 * @param {*} nombre
 * @param {*} descripcionCorta
 * @param {*} descripcion
 * @param {*} precio
 * @param {*} rutaImagen
 * @param {*} tipo
 */
function Producto(id, nombre, descripcion, descripcionCorta, precio, rutaImagen, tipo) {
  this.id = id;
  this.nombre = nombre;
  this.descripcionCorta = descripcionCorta;
  this.descripcion = descripcion;
  this.precio = precio;
  this.rutaImagen = rutaImagen;
  this.tipo = tipo;
}
/* Setter && Getter */
Producto.prototype = {
  setId: function setId(id) {
    this.id = id;
  },
  getId: function getId() {
    return this.id;
  },

  setNombre: function setNombre(nombre) {
    this.nombre = nombre;
  },
  getNombre: function getNombre() {
    return this.Nombre;
  },

  setDescripcion: function setDescripcion(descripcion) {
    this.descripcion = descripcion;
  },
  getDescripcion: function getDescripcion() {
    return this.descripcion;
  },

  setDescripcionCorta: function setDescripcionCorta(descripcion) {
    this.descripcionCorta = descripcionCorta;
  },
  getDescripcionCorta: function getDescripcionCorta() {
    return this.descripcionCorta;
  },

  setPrecio: function setPrecio(precio) {
    this.precio = precio;
  },
  getPrecio: function getPrecio() {
    return this.precio;
  },

  setRutaImagen: function setRutaImagen(rutaImagen) {
    this.rutaImagen = rutaImagen;
  },
  getRutaImagen: function getRutaImagen() {
    return this.rutaImagen;
  },

  setTipo: function setTipo(tipo) {
    this.tipo = tipo;
  },
  getTipo: function getTipo() {
    return this.tipo;
  }

  // Constantes
};var listaProductos = [];

var ProductosDOM = function (_React$Component) {
  _inherits(ProductosDOM, _React$Component);

  function ProductosDOM(props) {
    _classCallCheck(this, ProductosDOM);

    var _this = _possibleConstructorReturn(this, (ProductosDOM.__proto__ || Object.getPrototypeOf(ProductosDOM)).call(this, props));

    _this.comprarProducto = _this.comprarProducto.bind(_this);
    _this.masDetalleProducto = _this.masDetalleProducto.bind(_this);
    return _this;
  }

  _createClass(ProductosDOM, [{
    key: 'masDetalleProducto',
    value: function masDetalleProducto(id) {
      var productoElegido = void 0;

      for (var i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i]['id'] == id) {
          productoElegido = listaProductos[i];
        }
      }

      alert(productoElegido.descripcion);
    }
  }, {
    key: 'comprarProducto',
    value: function comprarProducto(id) {
      var productoElegido = void 0;

      for (var i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i]['id'] == id) {
          productoElegido = listaProductos[i];
        }
      }

      alert("Producto a comprar: " + productoElegido.nombre);

      console.log('a');
      cambiarBusqueda();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'producto' },
        React.createElement(
          'div',
          null,
          React.createElement('img', { src: this.props.cover, alt: 'producto tablet' })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'nombreProducto' },
            this.props.nombre
          ),
          React.createElement(
            'div',
            { className: 'descripcionProducto' },
            this.props.descripcion
          ),
          React.createElement(
            'div',
            { className: 'precioProducto' },
            this.props.precio
          ),
          React.createElement(
            'div',
            { className: 'enlaces_producto' },
            React.createElement(
              'a',
              {
                className: 'ver_detalles',
                href: 'javascript:void(0);',
                onClick: this.masDetalleProducto.bind(this, this.props.id) },
              'Ver mas detalles'
            ),
            React.createElement(
              'a',
              {
                className: 'comprar_producto \r ', href: 'javascript:void(0);',
                onClick: this.comprarProducto.bind(this, this.props.id) },
              'Comprar'
            )
          )
        )
      );
    }
  }]);

  return ProductosDOM;
}(React.Component);

ProductosDOM.defaultProps = {
  id: -1,
  nombre: 'Nombre no asignado',
  precio: 'Precio no asignado',
  descripcion: 'Descripcion no asignada',
  cover: 'Imagen no asignada'
};

function moldeProductos(items, api) {
  var numItems = items.length;
  for (var i = 0; i < numItems; i += 1) {
    if (api === 'eBay') {
      var id = items[i].itemId[0];
      var nombre = items[i].title[0];
      var descripcion = 'No disponible';
      var _descripcionCorta = 'No disponible';
      // descripcionCorta = `${descripcion.substring(0, 20)}...`;
      var precio = items[i].sellingStatus[0].currentPrice[0].__value__;
      var rutaImagen = items[i].galleryUrl;
      var tipo = 'tipo';
      var producto = new Producto(id, nombre, descripcion, _descripcionCorta, precio, rutaImagen, tipo);
      listaProductos.push(producto);
    }
    if (api === 'Walmart') {
      var _id = items[i].itemId;
      var _nombre = items[i].name;
      var _descripcion = items[i].longDescription;
      var _descripcionCorta2 = items[i].shortDescription;
      _descripcionCorta2 = _descripcion.substring(0, 20) + '...';
      var _precio = items[i].salePrice;
      var _rutaImagen = items[i].thumbnailImage;
      var _tipo = 'tipo';
      var _producto = new Producto(_id, _nombre, _descripcion, _descripcionCorta2, _precio, _rutaImagen, _tipo);
      listaProductos.push(_producto);
    }
  }
}