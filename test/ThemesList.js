'use strict';

import ThemesList from '../src/ThemesList';

describe('ThemesList', function() {

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

	it('should try to login and emit an error event if it fails', function() {
		let callback = sinon.spy();

		function createList() {
			return new ThemesList();
		}

		assert.throws(createList);
	});

	it('should try to login and emit a success event if it succeeds', function(done) {
		let callback = sinon.spy();

		let themesList = new ThemesList({
			username: 'test',
			password: 'test',
			companyId: 2013
		});

		themesList.on('fetchSuccess', function() {
			callback();
		});

		themesList.getThemes()
			.then((val) => {
				assert.deepEqual(callback.called, true);
				assert.ok(document.querySelector('.list'));
				assert.ok(themesList.list.listHTML !== '');
				done();
			});

		this.requests[0].respond(200, {
			"Content-Type": "application/json"
		},
			JSON.stringify([
				{
					name: 'Test theme',
					themeId: 0,
					contextPath: '/testContextPath',
					controlPanelTheme: false,
					device: 'Test device',
					imagesPath: '/testImagesPath',
					javascriptPath: '/testJavaScriptPath',
					staticResourcePath: '/testStaticResourcePath'
				}
			])
		);
	});

	it('should try to login and emit a fetchError event if it fails', function(done) {
		let callback = sinon.spy();

		let themesList = new ThemesList({
			username: 'test',
			password: 'test',
			companyId: 2013
		});

		themesList.on('fetchError', function() {
			callback();
		});

		themesList.getThemes()
			.then((val) => {
				assert.deepEqual(callback.called, true);
				done();
			});

		this.requests[0].respond(500);
	});
});
