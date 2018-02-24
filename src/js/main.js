/* global $ React */

// Constantes
const titulo = 'Tutorial de React';

class Menu extends React.Component {
  render() {
    const menuList = ['Item de menú 1', 'Item de menú 2', 'Item de menú 3'];

    const items = menuList.map(item => <li>{item}</li>);

    return (
      <ul>
        {items}
      </ul>
    );
  }
}

class App extends React.Component {
  render() {
    // Ni idea de cómo funciona esto. Pero ni idea!
    return (
      <div>
        <div>{titulo} - {App.props.subtitulo}</div>
        <Menu />
      </div>
    );
  }
}

App.defaultProps = {
  subtitulo: '¡Hola mundo!',
};

$(document).ready(() => {
  React.render(<App titulo={titulo} />, document.body);
});
