import React, {Component} from 'react';
import '../static/css/signupform.css';
import sjcl from '../../lib/sjcl.js';
import Button from '@material-ui/core/Button';

const serverURL = "http://localhost:8080/";

class SignUpForm extends Component {

  constructor() {
    super(); this.state = { username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        username: false,
        email: false,
        passwordLength: false,
        passwordMatch: false
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameError = this.handleUsernameError.bind(this);
    this.timeout = null;
  }

  handleUsernameChange(event) {
    clearTimeout(this.timeout);
    event.persist();
    this.setState({
      username: event.target.value,
    });
    this.timeout = setTimeout(function () {
      fetch(serverURL + 'userExists/' + event.target.value)
        .then((response) => response.text())
        .then((responseData) => {
          this.handleUsernameError(responseData != '');
        });
    }.bind(this), 800);
  }

  handleUsernameError(usernameExists) {
    this.setState({ 
      errors: {
        ...this.state.errors,
        username: (usernameExists || this.state.username.length < 4
                   || this.state.username.length > 16) && this.state.username.length != 0  
      }});
  }

  handleEmailChange(event) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ 
      email: event.target.value,
      errors: {
        ...this.state.errors,
        email: event.target.value.length != 0 && !emailRegex.test(event.target.value)
      }
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
      errors: {
        ...this.state.errors,
        passwordLength: event.target.value.length > 0 && event.target.value.length < 8,
        passwordMatch: (event.target.value.length != 0
          && this.state.passwordConfirm.length > 0
          && (this.state.passwordConfirm != event.target.value))
      } 
    });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ 
      passwordConfirm: event.target.value,
      errors: {
        ...this.state.errors,
        passwordLength: this.state.errors['passwordLength'],
        passwordMatch: (event.target.value.length != 0 && 
          (this.state.password != event.target.value)),
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, email, password, passwordConfirm, errors } = this.state;
    for (var key in this.state) {
      if (this.state[key] == '') {
        return;
      } else if (key == 'errors') {
        for (var errorKey in this.state.errors) {
          if (this.state.errors[errorKey])
            return;
        }
      }
    }
    this.submitFormData();
  }

  submitFormData() {
    fetch(serverURL + "user", { 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(this.state.password))
      })
    }).then(window.location.replace('/'))
    .catch(err => console.log(err))
  }

  checkError(errorField) {
    return this.state.errors[errorField];
  }

  render() {
    return (
      <div className="container">
        <form  id="signup-form" action="/api/user" method="post"
            onSubmit={this.handleSubmit}>
          <div id="signup-banner">
            <h1> GamePal </h1>
            <p> Social Gaming </p>
          </div>
          <div  id="signup-form-body">
            <input className={ this.checkError('username') ? 'error' : '' }
              type="text" name="username" placeholder="Username"
              onChange={ (e) => {this.handleUsernameChange(e);} }/>
            <br />
            <input className={ this.checkError('email') ? 'error' : '' }
              type="text" name="email" placeholder="Email"
              onChange={ (e) => {this.handleEmailChange(e);} }/>
            <br />
            <input className={ this.checkError('passwordLength') ? 'error' : '' }
              type="password" name="password" placeholder="Password"
              onChange={ (e) => {this.handlePasswordChange(e);} }/>
            <br />
            <input className={ this.checkError('passwordMatch') ? 'error' : '' }
              type="password" name="password-confirm" placeholder="Confirm password"
              onChange={ (e) => {this.handlePasswordConfirmChange(e);} }/>
            <div className={ 'errorBox' + (this.checkError('passwordLength') ? '' : ' hidden') }>
              <span>Password must be 8 or more characters long</span>
            </div>
            <div className={ 'errorBox' + (this.checkError('passwordMatch') ? '' : ' hidden') }>
              <span>Passwords do not match</span>
            </div>
            <Button type="submit" variant="contained" color="primary"
                onSubmit={ (e) => {this.handleSubmit(e);} }>
              Sign Up 
            </Button>
        </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
