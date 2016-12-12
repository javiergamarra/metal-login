'use strict';

import templates from './Login.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';

import {basicLogin} from './Services';

class Login extends Component {

  created() {

  }

  attached() {
    this.userEl = this.element.querySelector('input[type="text"][name="user"]');
    this.passEl = this.element.querySelector('input[type="password"][name="pass"]');
  }

  login() {
    event.stopPropagation();

    const url = 'http://localhost:8080/api/jsonws/user/get-current-user';

    return basicLogin(url, this.userEl.value, this.passEl.value)
      .then(val => this.emit('loginSuccess', val))
      .catch(err => this.emit('loginError', err));
  }

}

Login.STATE = {};

Soy.register(Login, templates);

export default Login;
