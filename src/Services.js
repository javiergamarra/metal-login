import Ajax from 'metal-ajax';
import MultiMap  from 'metal-multimap';


const LIFERAY_URL = 'http://localhost:8080';
/**
 * basicLogin makes a GET request to a given "login" URL,
 * with a basic authorization header given a username and
 * a password
 *
 * @returns {Promise}
 */
function basicLogin(liferayUrl = LIFERAY_URL, username = '', password = '') {


	return new Promise(function (resolve, reject)  {
		if (!liferayUrl || !username || !password) {
			reject(new Error('a url, username and password are required'));
		}

		const url = liferayUrl + '/api/jsonws/user/get-current-user';
		const opt_headers = new MultiMap();
		opt_headers.add('Authorization', 'Basic ' + btoa(username + ':' + password));

		return Ajax.request(url, 'GET', null, opt_headers)
			.then(function (val) {
				resolve(val);
			}, function (err) {
				reject(err);
			});
	});

}

function getThemes(liferayUrl = LIFERAY_URL, username = '', password = '', companyId = 0) {
	return new Promise(function (resolve, reject)  {
		if (!liferayUrl || !username || !password) {
			reject(new Error('a liferay url, username and password are required'));
		}

		const url = liferayUrl + '/api/jsonws/theme/get-themes';
		const opt_headers = new MultiMap();
		opt_headers.add('Authorization', 'Basic ' + btoa(username + ':' + password));

		const opt_params = new MultiMap();
		opt_params.add('companyId', companyId);

		return Ajax.request(url, 'GET', null, opt_headers, opt_params)
			.then(function (val) {
				resolve(val);
			}, function (err) {
				reject(err);
			});
	});
}

export {basicLogin, getThemes};
