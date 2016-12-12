'use strict';

import templates from '../Login.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

class BaseLogin extends Component {

	login() {
		// FIXME this doesn't allow reuse
		const userName = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		this.logic(userName, password).then(x => {
			this.emit('loginSuccess', x);
		}).catch(err => {
			this.emit('loginFailed', err);
		});
	}

	logic(userName, password) {
		console.log(userName);
		console.log(password);
	}
}

BaseLogin.STATE = {};

Soy.register(BaseLogin, templates);

export default BaseLogin;
