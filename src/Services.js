import Ajax from 'metal-ajax';
import MultiMap from 'metal-multimap';

/**
 * basicLogin makes a GET request to a given "login" URL,
 * with a basic authorization header given a username and
 * a password
 *
 * @return {Promise} a promise
 */
function basicLogin(url = '', username = '', password = '') {
  return new Promise(function(resolve, reject) {
    if (!url || !username || !password) {
      reject(new Error('a url, username and password are required'));
    }

    const optHeaders = new MultiMap();
    optHeaders.add('Authorization', 'Basic ' + btoa(username + ':' + password));

    return Ajax.request(url, 'GET', null, optHeaders)
      .then(function(val) {
        resolve(val);
      }, function(err) {
        reject(err);
      });
  });
}

export {basicLogin};
