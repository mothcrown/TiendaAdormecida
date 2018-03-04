/* global React $ */

class Registro extends React.Component {
  handleClick(e) {
    e.preventDefault();
    $('#loginDialog').dialog('open');
  }
  render() {
    return (
      <a href="#" onClick={this.handleClick}>Regístrate</a>
    );
  }
}

class Login extends React.Component {
  render() {
    return (
      <div>
        <i className="fa fa-user" />
        <Registro />
      </div>
    );
  }
}
