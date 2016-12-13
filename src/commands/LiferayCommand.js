export const LIFERAY_URL = 'http://localhost:8080';

export const LIFERAY_PATHS = {
	WS: '/api/jsonws',

	THEME_GET_THEMES: '/theme/get-themes',
	USER_GET_CURRENT_USER: '/user/get-current-user'
};

export class LiferayCommand {
	constructor(liferayUrl = LIFERAY_URL) {
		this.liferayUrl = liferayUrl;
	}

	execute() {}
}


