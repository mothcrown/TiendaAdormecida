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
    setId: function(id) {this.id=id;},
    getId: function(){return this.id;},

    setNombre: function(nombre){this.nombre=nombre;},
    getNombre: function(){return this.Nombre;},

    setDescripcion: function(descripcion){this.descripcion=descripcion;},
    getDescripcion: function(){return this.descripcion;},

    setDescripcionCorta: function(descripcion){this.descripcionCorta=descripcionCorta;},
    getDescripcionCorta: function(){return this.descripcionCorta;},


    setPrecio: function(precio){this.precio=precio;},
    getPrecio: function(){return this.precio;},

    setRutaImagen: function(rutaImagen){this.rutaImagen=rutaImagen;},
    getRutaImagen: function(){return this.rutaImagen;},

    setTipo: function(tipo){this.tipo=tipo;},
    getTipo: function(){return this.tipo;},
}

// Constantes
const listaProductos = [];

class ProductosDOM extends React.Component {
  constructor(props) {
    super(props);
    this.comprarProducto = this.comprarProducto.bind(this);
    this.masDetalleProducto = this.masDetalleProducto.bind(this);
  }

  masDetalleProducto(id) {
    let productoElegido;

    for(var i = 0; i < listaProductos.length; i++){
      if(listaProductos[i]['id'] == id){
        productoElegido = listaProductos[i];
      }
    }

    alert(productoElegido.descripcion);
  }

  comprarProducto(id) {
    let productoElegido;
    
        for(var i = 0; i < listaProductos.length; i++){
          if(listaProductos[i]['id'] == id){
            productoElegido = listaProductos[i];
          }
        }
    
        alert("Producto a comprar: "+productoElegido.nombre);

    console.log('a');
    cambiarBusqueda ();
  }

  render() {
    return (
      <div className="producto">
        <div>
          <img src={this.props.cover} alt="producto tablet" />
        </div>
        <div>
          <div className="nombreProducto">{this.props.nombre}</div>
          <div className="descripcionProducto">{this.props.descripcion}</div>
          <div className="precioProducto">{this.props.precio}</div>
          <div className="enlaces_producto">
            <a
              className="ver_detalles"
              href="javascript:void(0);"
              onClick={this.masDetalleProducto.bind(this,this.props.id)}>
              Ver mas detalles
            </a>
            <a 
              className="comprar_producto 
              "href="javascript:void(0);" 
              onClick={this.comprarProducto.bind(this,this.props.id)}>
              Comprar
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ProductosDOM.defaultProps = {
  id: -1,
  nombre: 'Nombre no asignado',
  precio: 'Precio no asignado',
  descripcion: 'Descripcion no asignada',
  cover: 'Imagen no asignada',
};

function moldeProductos(items, api) {
  const numItems = items.length;
  for (let i = 0; i < numItems; i += 1) {
    if (api === 'eBay') {
      const id = items[i].itemId[0];
      const nombre = items[i].title[0];
      const descripcion = 'No disponible';
      const descripcionCorta = 'No disponible';
      // descripcionCorta = `${descripcion.substring(0, 20)}...`;
      const precio = items[i].sellingStatus[0].currentPrice[0].__value__;
      const rutaImagen = items[i].galleryUrl;
      const tipo = 'tipo';
      const producto = new Producto(id, nombre, descripcion, descripcionCorta, precio, rutaImagen, tipo);
      listaProductos.push(producto);
    }
    if (api === 'Walmart') {
      const id = items[i].itemId;
      const nombre = items[i].name;
      const descripcion = items[i].longDescription;
      let descripcionCorta = items[i].shortDescription;
      descripcionCorta = `${descripcion.substring(0, 20)}...`;
      const precio = items[i].salePrice;
      const rutaImagen = items[i].thumbnailImage;
      const tipo = 'tipo';
      const producto = new Producto(id, nombre, descripcion, descripcionCorta, precio, rutaImagen, tipo);
      listaProductos.push(producto);
    }
  }
}

