'use strict';

import { basicLogin, getThemes } from '../src/Services';

describe('Services', function() {

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

	describe('basicLogin', function() {

		it('should fail if arguments are null', (done) => {
			let reject = sinon.spy();
			basicLogin()
				.then(null, () => {
					reject();
					assert.deepEqual(reject.called, true);
					done();
				});
		});

		it('should resolve if login request succeeds', function(done) {
			let resolve = sinon.spy();

			basicLogin('http://localhost:8080', 'test@test.com', '1234')
				.then(function() {
					resolve();
					assert.deepEqual(resolve.called, true);
					done();
				}, null);

			this.requests[0].respond(200);
		});
	});


	describe('getThemes', function() {

		it('should fail when themes request fails', function(done) {
			let reject = sinon.spy();

			getThemes()
				.then(null,
					function() {
						reject();
						assert.deepEqual(reject.called, true);
						done();
					});

			this.requests[0].respond(500);
		});

		it('should resolve themes request succeeds', function(done) {
			let resolve = sinon.spy();

			getThemes('http://localhost:8080', 'test@test.com', '1234')
				.then(function() {
					resolve();
					assert.deepEqual(resolve.called, true);
					done();
				}, null);

			this.requests[0].respond(200);
		});
	});
});
