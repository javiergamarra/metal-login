'use strict';

import templates from './Login.soy.js';
import Soy from 'metal-soy';
import BaseLogin from "./inherited/BaseLogin";

const companyId = 20116;
const BASE_URL = 'http://localhost:8080/';
const API_JSON = 'api/jsonws/';

class LoginInheritedLiferay extends BaseLogin {

  logic(userName, password) {
    return WeDeploy
      .url(BASE_URL + API_JSON + 'user/get-user-by-email-address')
      .auth(userName, password)
      .header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .form('companyId', companyId)
      .form('emailAddress', userName)
      .post();
  }
}

LoginInheritedLiferay.STATE = {};

Soy.register(LoginInheritedLiferay, templates);

export default LoginInheritedLiferay;
