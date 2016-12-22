import Ajax from 'metal-ajax';
import MultiMap from 'metal-multimap';

import { LIFERAY_PATHS, LIFERAY_URL, LiferayCommand } from './LiferayCommand';


class LiferayLoginCommand extends LiferayCommand {
	constructor(username, password) {
		super(LIFERAY_URL);
		this.url = this.liferayUrl + LIFERAY_PATHS.WS + LIFERAY_PATHS.USER_GET_CURRENT_USER;
		this.username = username;
		this.password = password;
	}

	execute() {
		if (!this.username || !this.password) {
			throw new Error('a username and password are required');
		}

		const opt_headers = new MultiMap();
		opt_headers.add('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));

		return Ajax.request(this.url, 'GET', null, opt_headers);
	}
}


export default LiferayLoginCommand;

