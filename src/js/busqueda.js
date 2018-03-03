/* global $ React */

// JSONs simplitos que nos va a ayudar muchito
const apiKey = {
  eBay: 'MarcosDa-TiendaAd-SBX-6df6f4b63-ba6b285d',
  Walmart: 'rrxgpza76z7ea5r2db73jtkz',
};

const urlBasica = {
  walmart: 'http://api.walmartlabs.com/v1/search?',
};

const idCategorias = {
  camaras: {
    Walmart: '944_133277',
  },
  relojes: {
    Walmart: '3891_3906',
  },
  tablets: {
    Walmart: '3944_1078524',
  },
};

function buscaWalmart(keywords, idCategoria) {
  $.getJSON(urlBasica.walmart, {
    query: keywords,
    apikey: apiKey.Walmart,
    categoryId: idCategoria,
    format: 'json',
    limit: 20,
  })
    .done(function (response) {
      const aux = response;
    });
}

function buscaProductos(keywords, categoria) {
  let busqueda = keywords;
  // Quita espacios y los cambia por '%20'
  busqueda = encodeURIComponent(busqueda.trim());
  const resultado = buscaWalmart(busqueda, idCategorias[categoria].Walmart);
}

class BusquedaAvanzada extends React.Component {
  render() {
    return (
      <a href="#">Avanzada</a>
    );
  }
}

class BotonBusqueda extends React.Component {
  static handleClick() {
    // Estoy trabajando en esto, pero guay, eh?
  }
  render() {
    return (
      <button id="botonBusqueda"><i className="fa fa-search" /> Buscar</button>
    );
  }
}

class SelectBusqueda extends React.Component {
  render() {
    const { categorias } = this.props;

    // opt: camaras, categorias[opt] = 'Cámaras'
    const option = Object.keys(categorias).map(opt =>
      <option value={opt}>{categorias[opt]}</option>);
    return (
      <select id="selectBusqueda">
        {option}
      </select>
    );
  }
}

SelectBusqueda.contextType = {
  categorias: React.PropTypes.object,
};

SelectBusqueda.defaultProps = {
  categorias: {
    camaras: 'Cámaras',
    relojes: 'Relojes',
    tablets: 'Tablets',
  },
};

class InputBusqueda extends React.Component {
  render() {
    return (
      <input id="inputBusqueda" type="text" placeholder="Busca ofertas" />
    );
  }
}

class Busqueda extends React.Component {
  render() {
    return (
      <div>
        <InputBusqueda />
        <SelectBusqueda />
        <BotonBusqueda />
        <BusquedaAvanzada />
      </div>
    );
  }
}
