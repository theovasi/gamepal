import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { withCookies } from 'react-cookie';

import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Discover from './components/Discover';
import { isLoggedIn  }from './util/auth';


class App extends React.Component {

  constructor () {
    super();
    this.state = {
      loginChecked: false,
      loggedIn: false }
  }

  checkLogin = () => {
    let token = this.props.cookies.get('token');
    isLoggedIn(token).then((res) => this.setState({
      loginChecked: true,
      loggedIn: (res.status == 200) 
    }));
  }

  render () {
    return (
      <div>
        <Switch>
          <Route
            path="/discover" render = {() => {
              if (!this.state.loginChecked) this.checkLogin();

              let token = this.props.cookies.get('token');
              if (token && this.state.loginChecked && this.state.loggedIn) {
                return <Discover cookies={ this.props.cookies } />
              }
              else if (token && !this.state.loginChecked) {
                return <span> Loading... </span>
              }
              else {
                return <Redirect to="/login" cookies={ this.props.cookies } />
              }
            }}
          />
          <Route
            path="/profile" render = {() => {
              if (!this.state.loginChecked) this.checkLogin();

              let token = this.props.cookies.get('token');
              if (token && this.state.loginChecked && this.state.loggedIn) {
                return <Profile cookies={ this.props.cookies } />
              }
              else if (token && !this.state.loginChecked) {
                return <span> Loading... </span>
              }
              else {
                return <Redirect to="/login" cookies={ this.props.cookies } />
              }
            }}
          />
          <Route
            path="/signup" render = {() => (<SignUpForm cookies={ this.props.cookies } />)}
          />
          <Route
            path="/login" render = {() => (<LoginForm cookies={ this.props.cookies } />)}
          />
          <Route
            path="/" render = {() => (<Redirect to="/discover" cookies={ this.props.cookies } />)}
          />
        </Switch>
      </div>
    );
  }
}

export default withCookies(App);
