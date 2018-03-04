/* global React $ */

class Registro extends React.Component {
  render() {
    return (
      <a href="#">Regístrate</a>
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
