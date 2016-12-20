'use strict';

import templates from './Login.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';

import LiferayLoginCommand from './commands/LiferayLoginCommand';

class Login extends Component {

	attached() {
		this.userEl = this.element.querySelector('input[type="text"][name="user"]');
		this.passEl = this.element.querySelector('input[type="password"][name="pass"]');
		this.loginBtn = this.element.querySelector('input[type="submit"][name="login"]');
		dom.on(this.loginBtn, 'click', this.login.bind(this));
	}

	login() {
		event.stopPropagation();

		const cmd = new LiferayLoginCommand(this.userEl.value, this.passEl.value);

		return cmd.execute()
			.then((res) => {
				const name = res.status === 200 ? 'loginSuccess' : 'loginError';
				this.emit(name, res.responseText);
			})
			.catch(err => {
				this.emit('loginError', err);
			});
	}
}

Login.STATE = { };

Soy.register(Login, templates);

export default Login;
