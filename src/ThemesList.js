'use strict';

import templates from './ThemesList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';
import List from 'metal-list';

import {getThemes} from './Services';

class ThemesList extends Component {

	constructor(opt_config, opt_parentElement) {
		super(opt_config, opt_parentElement);

		this.liferayUrl = opt_config.liferayUrl;
		this.username = opt_config.username;
		this.password = opt_config.password;
		this.companyId = opt_config.companyId;

		getThemes(this.liferayUrl, this.username, this.password, this.companyId)
			.then((val) => {

				const themes = JSON.parse(val.responseText);
				let html = '';
				let len = themes.length;

				for (let i = 0; i < len; i++) {
					html += '<hr>';
					html += '<p><strong>Name</strong>: ';
					html += themes[i].name;
					html += '</p>';

					html += '<p><strong>Theme ID</strong>: ';
					html += themes[i].themeId;
					html += '</p>';

					html += '<p><strong>Context path</strong>: ';
					html += themes[i].contextPath;
					html += '</p>';

					html += '<p><strong>Control panel theme</strong>: ';
					html += themes[i].controlPanelTheme;
					html += '</p>';

					html += '<p><strong>Device</strong>: ';
					html += themes[i].device;
					html += '</p>';

					html += '<p><strong>Images path</strong>: ';
					html += themes[i].imagesPath;
					html += '</p>';

					html += '<p><strong>JavaScript path</strong>: ';
					html += themes[i].javaScriptPath;
					html += '</p>';

					html += '<p><strong>Static resource path</strong>: ';
					html += themes[i].staticResourcePath;
					html += '</p>';
				}
				this.list.itemsHtml = html;
		})
		.catch((err) => {
			this.emit('fetchError', err);
		});
	}

	attached() {
		this.list = new List({element: this.element});
	}
}

ThemesList.STATE = {};

Soy.register(ThemesList, templates);

export default ThemesList;
