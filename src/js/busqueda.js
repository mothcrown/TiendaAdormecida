/* global React */

class BusquedaAvanzada extends React.Component {
  render() {
    return (
      <a href="#">Avanzada</a>
    );
  }
}

class BotonBusqueda extends React.Component {
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
