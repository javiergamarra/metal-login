'use strict';

import ThemesList from '../src/ThemesList';

describe('ThemesList', function() {

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

	it('should try to login and emit an error event if it fails', function(done) {
		let callback = sinon.spy();
		let themesList = new ThemesList({});

		themesList.on('fetchError', function () {
			callback();
			assert.deepEqual(callback.called, true);
			assert.ok(document.querySelector('.list'));




			done();
		});
	});

});
