import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { addUser } from '../redux/actions/index';
import { Cookies, withCookies } from 'react-cookie';
import sjcl from '../../lib/sjcl.js'
import jwt from 'jsonwebtoken';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
import "../static/css/loginform.css";


const serverURL = "http://localhost:8080/";

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

class Form extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      userIdentifier: "",
      password: "",
      errors: {
        userIdentifier: false,
        password: false
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserIdentifierError = this.handleUserIdentifierError.bind(this);
    this.timeout = null;
  }

  handleUserIdentifierChange(event) {
    clearTimeout(this.timeout);

    event.persist();
    this.setState({
      userIdentifier: event.target.value
    });

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let userIdentifierType;
    if (emailRegex.test(event.target.value)) {
      userIdentifierType = 'email';
    } else {
      userIdentifierType = 'username';
    }

    this.timeout = setTimeout(
      function() {
        fetch(serverURL + 'userExists/' + event.target.value)
          .then(response => response.text())
          .then(responseData => {
            let userIdentifierExists = (responseData != null) && (responseData != "");
            this.handleUserIdentifierError(userIdentifierExists, userIdentifierType);
          });
      }.bind(this),
      1000
    );
  }

  handleUserIdentifierError(userIdentifierExists, userIdentifierType) {
    this.setState({
      errors: {
        ...this.state.errors,
        userIdentifier:
          (!userIdentifierExists ||
            this.state.userIdentifier.length < 4 ||
            (userIdentifierType == 'username' &&
              this.state.userIdentifier.length > 16)) &&
          this.state.userIdentifier.length != 0
      }
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
      errors: {
        ...this.state.errors,
        password: event.target.value.length > 0 && event.target.value.length < 8
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props;

    const { userIdentifier, password, errors } = this.state;
    for (var key in this.state) {
      if (this.state[key] == "") {
        return;
      } else if (key == "errors") {
        for (var errorKey in this.state.errors) {
          if (this.state.errors[errorKey]) return;
        }
      }
    }
    this.props.addUser({ userIdentifier });
    this.submitFormData();
  }

  submitFormData() {
    const { cookies } = this.props;
    fetch(serverURL + "login", { 
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        userIdentifier: this.state.userIdentifier,
        password: sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(this.state.password))
      })
    }
    )
      .then(res => res.json())
      .then(data => data.token)
      .then(token => {
        cookies.set("token", token, {path: "/"});
        window.location.replace('/discover');
      })
      .catch(err => console.log(err))
  }

  checkError(errorField) {
    return this.state.errors[errorField];
  }

  render() {
    return (
      <div className="container">
        <form
          id="login-form"
          action="api/user"
          method="get"
          onSubmit={ e => {
            this.handleSubmit(e);
          }}
          >
          <div id="login-banner">
            <h1> GamePal </h1>
            <p> Social Gaming </p>
          </div>
          <div id="login-form-body">
            <input
              className={this.checkError("userIdentifier") ? "error" : ""}
              type="text"
              name="userIdentifier"
              placeholder="Username or Email"
              onChange={e => {
                this.handleUserIdentifierChange(e);
              }}
            />
            <br />
            <input
              className={this.checkError("password") ? "error" : ""}
              type="password"
              name="password"
              placeholder="Password"
              onChange={e => {
                this.handlePasswordChange(e);
              }}
            />
            <br />
            <div id='buttonContainer'>
              <Button
                type="submit"
                variant="contained"
                color="primary">
                Log in
              </Button>
              <div style={{display: 'inline-block', margin: '5px'}}>or</div>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="primary">
                Sign Up 
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const LoginForm = connect(null, mapDispatchToProps)(Form)
export default withCookies(LoginForm);
