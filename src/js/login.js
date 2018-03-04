/* global React $ */

/**
 * Copiar y pegar.
 * @param {} googleUser 
 */
function onSignInGoogle(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  // $('.g-signin2').css('display', 'none');
  $('#login').empty();
  // Esto tuve que hacerlo y no me siento nada orgulloso de ello
  $('#login').append(`
    <div class="data">
        <p id="name"></p>
        <img id="pic" class="img-circle" width="50" height="50"/>
        <button onclick="signOutGoogle()" class="btn btn-danger">Salir</button>
    </div>
  `);
  $('.data').css('display', 'block');
  $('#pic').attr('src', profile.getImageUrl());
  $('#name').text(profile.getName());
}

function signOutGoogle() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    $('.g-signin2').css('display', 'block');
    $('#login').empty();
    React.render(<Login />, document.getElementById('login'));
  });
}

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
