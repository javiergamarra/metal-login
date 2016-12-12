'use strict';

import Login from '../src/LoginInjected';

describe('Login', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it('should add a component to the DOM', function() {
    let el = document.querySelector('.loginmodal-container');
    assert.ok(el);
  });

  it('should try to login and emit an error event if it fails', function(done) {
    let callback = sinon.spy();
    let login = new Login();

    login.on('loginError', function() {
      callback();
      assert.deepEqual(callback.called, true);
      done();
    });

    let btn = login.element.querySelector('input[type="submit"]');
    btn.click();
  });

  it('should try to login and emit a success event if it works', function(done) {
    let callback = sinon.spy();

    let login = new Login();
    login.userEl.value = 'test';
    login.passEl.value = 'test';

    login.on('loginSuccess', function(val) {
      callback();
      assert.deepEqual(callback.called, true);
      assert.deepEqual(val.status, 200);
      done();
    });

    let btn = login.element.querySelector('input[type="submit"]');
    btn.click();
    this.requests[0].respond(200);
  });
});
