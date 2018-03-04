/* global $ React moldeProductos listaProductos */

// JSONs simplitos que nos va a ayudar muchito
const apiKey = {
  eBay: 'MarcosDa-TiendaAd-PRD-0df64df3e-523ae795',
  Walmart: 'rrxgpza76z7ea5r2db73jtkz',
};

const urlBasica = {
  ebay: 'http://svcs.ebay.com/services/search/FindingService/v1?',
  walmart: 'http://api.walmartlabs.com/v1/search?callback=?',
};

const idCategorias = {
  camaras: {
    eBay: '31388',
    Walmart: '3944_133277_4468',
  },
  relojes: {
    eBay: '31387',
    Walmart: '3891_3906',
  },
  tablets: {
    eBay: '171485',
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
      moldeProductos(response.items, 'Walmart');
    });
}

/**
 * HE VENCIDO A ESTA PETICIÓN AJAX. SOY EL SEÑOR DE EBAY!
 *  - Marcos.
 */
function buscaEBay(keywords, idCategoria) {
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
      keywords,
      categoryId: idCategoria,
      // siteid: '0',
      'paginationInput.entriesPerPage': 10,
    },
    success: function (response) {
      console.warn(response);
      moldeProductos(response.findItemsAdvancedResponse[0].searchResult[0].item, 'eBay');
    },
  });
}

function buscaProductos(keywords, categoria) {
  let busqueda = keywords;
  // Quita espacios y los cambia por '%20'
  busqueda = encodeURIComponent(busqueda.trim());
  buscaWalmart(busqueda, idCategorias[categoria].Walmart);
  buscaEBay(busqueda, idCategorias[categoria].eBay);
}

class BusquedaAvanzada extends React.Component {
  render() {
    return (
      <a href="#">Avanzada</a>
    );
  }
}

class BotonBusqueda extends React.Component {
  handleClick() {
    const keywords = $('#inputBusqueda').val();
    const categoria = $('#selectBusqueda').val();
    buscaProductos(keywords, categoria);
  }
  render() {
    return (
      <button id="botonBusqueda" onClick={this.handleClick}>
        <i className="fa fa-search" />
         Buscar
      </button>
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
