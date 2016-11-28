'use strict';

import templates from './Login.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';

class Login extends Component {

	created() {
	}

	attached() {
	}

	login() {
		console.log('a');
		event.stopPropagation();
	}

}

Login.STATE = {

	passwordElement: {
		setter: dom.toElement
	},

};

Soy.register(Login, templates);

export default Login;
