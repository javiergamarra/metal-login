import Ajax from 'metal-ajax';
import MultiMap  from 'metal-multimap';

import {
	LIFERAY_PATHS,
	LIFERAY_URL,
	LiferayCommand
} from './LiferayCommand';


class LiferayGetThemesCommand extends LiferayCommand {

	constructor(username, password, companyId) {
		super(LIFERAY_URL);
		this.url = this.liferayUrl + LIFERAY_PATHS.WS + LIFERAY_PATHS.THEME_GET_THEMES;
		this.username = username;
		this.password = password;
		this.companyId = companyId;
	}

	execute() {
		if (!this.username || !this.password || !this.companyId) {
			throw new Error('a username and password are required');
		}

		const opt_headers = new MultiMap();
		opt_headers.add('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));

		const opt_params = new MultiMap();
		opt_params.add('companyId', this.companyId);

		return Ajax.request(this.url, 'GET', null, opt_headers, opt_params);
	}
};

export default LiferayGetThemesCommand;

