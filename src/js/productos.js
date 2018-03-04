/* global React $ urlBasica apiKey */

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
let listaProductos;
let listaProductosReact;
const a = [];

class Productos extends React.Component {
  render() {
    listaProductosReact = [];
    for (let x = 0; x < listaProductos.length; x += 1) {
      listaProductosReact[listaProductosReact.length] =
        (
          <ProductosDOM
            id={listaProductos[x].id}
            nombre={listaProductos[x].nombre}
            precio={listaProductos[x].precio}
            descripcion={listaProductos[x].descripcionCorta}
            cover={listaProductos[x].rutaImagen}
          />
        );
    }
    // return (<div className="contenedor_producto">{listaProductos}</div>);
    return (<div className="contenedor_productos">{listaProductosReact}</div>);
  }
}

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
    // <div className="descripcionProducto">{this.props.descripcion}</div>
    const nombre = (this.props.nombre.length > 40) ? `${this.props.nombre.substring(0, 40)}...` : this.props.nombre;
    return (
      <div className="producto">
        <div>
          <img src={this.props.cover} alt="producto tablet" />
        </div>
        <div>
          <div className="nombreProducto">{nombre}</div>
          <div><b>Precio:</b> <span className="precioProducto">{this.props.precio}</span></div>
          <div className="enlaces_producto">
            <a
              className="ver_detalles"
              href="javascript:void(0);"
              onClick={this.masDetalleProducto.bind(this,this.props.id)}>
              Ver detalles 
              <i className="fa fa-search-plus" />
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

function quitarCaracteresRaros(cadena) {
  let textoLimpio;

  textoLimpio = cadena.replace(/&lt;/gi, '');
  textoLimpio = textoLimpio.replace(/&gt;/gi, '');
  textoLimpio = textoLimpio.replace(/&quot;/gi, '');
  textoLimpio = textoLimpio.replace(/br&gt;/gi, '');
  textoLimpio = textoLimpio.replace(/b&gt;/gi, '');
  textoLimpio = textoLimpio.replace(/li&gt;/gi, '');
  textoLimpio = textoLimpio.replace(/ul&gt;/gi, '');
  textoLimpio = textoLimpio.replace(/\\"/gi, '');
  textoLimpio = textoLimpio.replace(/[""]/gi, '');
  textoLimpio = textoLimpio.replace(/["]/gi, '');
  textoLimpio = textoLimpio.replace(/["\"]/gi, '');
  textoLimpio = textoLimpio.replace(/[\""]/gi, '');
  return textoLimpio;
}

/**
 * Convertir de dolar a euro.
 * JOEL MVP!
 */
function convertirDolarAEuro() {
  const listaPrecios = $('.precioProducto');
  const listaPreciosLength = listaPrecios.length;
  for (let i = 0; i < listaPreciosLength; i += 1) {
    $.getJSON(urlBasica.forex, {
      quantity: parseInt($(listaPrecios[i]).text(), 10),
      api_key: apiKey.Forex,
      format: 'json',
    }).done(function (response) {
      const posA = (response.text).indexOf(' USD');
      const dolar = (response.text+"").substring(0, posA);
      const eur = response.value.toFixed(2);
      $(listaPrecios[i]).text(`${eur}€`);
    });
  }


}

function mostrarProductos() {
  React.render(<Productos />, document.getElementById('productos'));
  convertirDolarAEuro();
}

function moldeProductos(items, api) {
  listaProductos = [];
  const numItems = items.length;
  for (let i = 0; i < numItems; i += 1) {
    if (api === 'eBay') {
      const id = items[i].itemId[0];
      const nombre = items[i].title[0];
      const descripcion = 'No disponible';
      const descripcionCorta = 'No disponible';
      // descripcionCorta = `${descripcion.substring(0, 20)}...`;
      const precio = items[i].sellingStatus[0].currentPrice[0].__value__;
      const rutaImagen = items[i].galleryURL[0];
      const tipo = 'tipo';
      const producto = new Producto(id, nombre, descripcion, descripcionCorta, precio, rutaImagen, tipo);
      listaProductos.push(producto);
    }
    if (api === 'eBay-Default') {
      const id = items[i].itemId;
      const nombre = items[i].title;
      const descripcion = 'No disponible';
      const descripcionCorta = 'No disponible';
      // descripcionCorta = `${descripcion.substring(0, 20)}...`;
      const precio = items[i].buyItNowPrice.__value__;
      const rutaImagen = items[i].imageURL;
      const tipo = 'tipo';
      const producto = new Producto(id, nombre, descripcion, descripcionCorta, precio, rutaImagen, tipo);
      listaProductos.push(producto);
    }
    if (api === 'Walmart') {
      const id = items[i].itemId;
      const nombre = quitarCaracteresRaros(items[i].name);
      const descripcion = quitarCaracteresRaros(items[i].longDescription);
      let descripcionCorta = quitarCaracteresRaros(items[i].shortDescription);
      descripcionCorta = `${descripcion.substring(0, 20)}...`;
      const precio = items[i].salePrice;
      const rutaImagen = items[i].thumbnailImage;
      const tipo = 'tipo';
      const producto = new Producto(id, nombre, descripcion, descripcionCorta, precio, rutaImagen, tipo);
      listaProductos.push(producto);
    }
  }
  mostrarProductos();
}

