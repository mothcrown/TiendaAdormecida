/* global $ React moldeProductos urlBasica apiKey idCategorias listaProductos */

function buscaWalmart(keywords, idCategoria, limit) {
  $.getJSON(urlBasica.walmart, {
    query: keywords,
    apikey: apiKey.Walmart,
    categoryId: idCategoria,
    format: 'json',
    limit,
  })
    .done(function (response) {
      moldeProductos(response.items, 'Walmart');
    });
}

/**
 * HE VENCIDO A ESTA PETICIÓN AJAX. SOY EL SEÑOR DE EBAY!
 *  - Marcos.
 */
function buscaEBay(keywords, idCategoria, limit) {
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
      'paginationInput.entriesPerPage': limit,
    },
    success: function (response) {
      moldeProductos(response.findItemsAdvancedResponse[0].searchResult[0].item, 'eBay');
    },
  });
}

/**
 * Lanzamos peticiones ajax a todos lados y esperamos que pasen cosas
 * @param {*} keywords 
 * @param {*} categoria 
 */
function buscaProductos(keywords, categoria) {
  let busqueda = keywords;
  // Walmart es especialito con estas cosas.
  if (keywords !== '' && keywords !== '*' ) {
    buscaWalmart(busqueda, idCategorias[categoria].Walmart, 5);
    buscaEBay(busqueda, idCategorias[categoria].eBay, 5);
  } else {
    buscaEBay(busqueda, idCategorias[categoria].eBay, 10);
  }
}

/**
 * Busca los items más vistos según categoría
 * @param {*} categoria 
 */
function buscaDefecto(categoria) {
  const urlDefecto = 'https://svcs.ebay.com/MerchandisingService?';
  $.ajax({
    url: urlDefecto,
    type: 'POST',
    jsonp: 'callback',
    dataType: 'JSONP',
    data: {
      'OPERATION-NAME': 'getMostWatchedItems',
      'SERVICE-NAME': 'MerchandisingService',
      'SERVICE-VERSION': '1.1.0',
      'CONSUMER-ID': apiKey.eBay,
      'GLOBAL-ID': 'EBAY-US',
      'RESPONSE-DATA-FORMAT': 'JSON',
      'REST-PAYLOAD': true,
      maxResults: 10,
      categoryId: categoria,
    },
    success: function (response) {
      moldeProductos(response.getMostWatchedItemsResponse.itemRecommendations.item, 'eBay-Default');
    },
  });
}

/**
 * :D
 */
class BusquedaAvanzada extends React.Component {
  handleClick() {
    $('#avanzadaDialog').dialog('open');
  }
  render() {
    return (
      <a href="#" onClick={this.handleClick.bind(this)}>Avanzada</a>
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
      // Esto me costó.
      <button id="botonBusqueda" onClick={this.handleClick.bind(this)}>
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

/**
 * Cuando buscas algo y pulsas enter salen cosas. Guay, eh?
 */
class InputBusqueda extends React.Component {
  handleKeyPress(e) {
    if (e.which === 13 || e.keyCode === 13) {
      const keywords = $('#inputBusqueda').val();
      const categoria = $('#selectBusqueda').val();
      buscaProductos(keywords, categoria);
    }
  }
  render() {
    return (
      <input id="inputBusqueda" type="text" placeholder="Busca ofertas" onKeyPress={this.handleKeyPress.bind(this)} />
    );
  }
}

/**
 * Clase Busqueda
 */
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
