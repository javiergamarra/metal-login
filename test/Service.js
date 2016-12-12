'use strict';

import {basicLogin} from '../src/Services';


describe('basicLogin', function() {

	beforeEach(function () {
		this.xhr = sinon.useFakeXMLHttpRequest();
		var requests = this.requests = [];
		this.xhr.onCreate = function (xhr) {
			requests.push(xhr);
		};
	});

	afterEach(function () {
		this.xhr.restore();
	});

	it('should fail if arguments are null', (done) => {
		let reject = sinon.spy();
		basicLogin()
			.then(null, () => {
				reject();
				assert.deepEqual(reject.called, true);
				done();
			});
	});

	it('should resolve request succeeds', function (done) {
		let resolve = sinon.spy();

		basicLogin('/login', 'test', 'test')
			.then(function () {
				resolve();
				assert.deepEqual(resolve.called, true);
				done();
			}, null);

		this.requests[0].respond(200);
	});

});
