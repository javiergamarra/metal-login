'use strict';

import WeDeploy from 'wedeploy';
import Component from "metal-component";

export default class WeDeployLogin extends Component {

  login(userName, password) {
    return WeDeploy
      .auth('http://auth.boilerplate-auth.wedeploy.io')
      .signInWithEmailAndPassword(userName, password);
  }

}
