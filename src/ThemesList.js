'use strict';

import templates from './ThemesList.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import dom from 'metal-dom';
import List from 'metal-list';

import LiferayGetThemesCommand from './commands/LiferayGetThemesCommand';

class ThemesList extends Component {

	constructor(opt_config, opt_parentElement) {
		super(opt_config, opt_parentElement);

		this.username = opt_config.username;
		this.password = opt_config.password;
		this.companyId = opt_config.companyId;
	}

	attached() {
		this.list = new List({
			element: this.element
		});
	}

	getThemes() {
		const cmd = new LiferayGetThemesCommand(this.username, this.password, this.companyId);

		return cmd.execute()
			.then((val) => {
				const themes = JSON.parse(val.responseText);
				let html = '';
				let len = themes.length;

				for (let i = 0; i < len; i++) {
					html += `<hr>\n
						<p><strong>Name</strong>: ${themes[i].name}</p>
						<p><strong>Theme ID</strong>: ${themes[i].themeId}</p>
						<p><strong>Context Path</strong>: ${themes[i].contextPath}</p>
						<p><strong>Control panel theme</strong>: ${themes[i].controlPanelTheme}</p>
						<p><strong>Device</strong>: ${themes[i].device}</p>
						<p><strong>Images path</strong>: ${themes[i].imagesPath}</p>
						<p><strong>JavaScript path</strong>: ${themes[i].javaScriptPath}</p>
						<p><strong>Static resource path</strong>: ${themes[i].staticResourcePath}</p>`;
				}
				this.list.itemsHtml = html;
				this.emit('fetchSuccess', val);
			})
			.catch((err) => {
				this.emit('fetchError', err);
			});
	}
}

ThemesList.STATE = {};

Soy.register(ThemesList, templates);

export default ThemesList;
