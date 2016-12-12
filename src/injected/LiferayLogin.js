'use strict';

import WeDeploy from 'wedeploy';
import Component from "metal-component";

// FIXME hardcoded
const companyId = 20116;
const BASE_URL = 'http://localhost:8080/';
const API_JSON = 'api/jsonws/';

export default class LiferayLogin extends Component {

  login(userName, password) {
    return WeDeploy.url(BASE_URL + API_JSON + 'user/get-user-by-email-address')
      .auth(userName, password)
      .header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .form('companyId', companyId)
      .form('emailAddress', userName)
      .post()
      .then(
        x => {
          if (x.body().exception) {
            throw new Error();
          }
          return x.body();
        });
  }
}
