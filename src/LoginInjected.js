'use strict';

import templates from './Login.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import EventHandler from 'metal-events';

class LoginInjected extends Component {

  created() {
    this.eventHandler_ = new EventHandler();
  }

  detached() {
    this.eventHandler_.removeAllListeners();
  }

  login() {
		// FIXME this doesn't allow reuse
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let backend = this.getInitialConfig().backend;

    backend
      .login(userName, password)
      .then(x => this.eventHandler_.emit('loginSuccess', x))
      .catch(err => this.eventHandler_.emit('loginFailed', err));
  }
}

LoginInjected.STATE = {};

Soy.register(LoginInjected, templates);

export default LoginInjected;
