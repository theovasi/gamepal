import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import index from './redux/index';
import store from './redux/store';
import LoginForm from './components/LoginForm';
import App from './App';

ReactDOM.render(
  <CookiesProvider>
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById('container')
);
