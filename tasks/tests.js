'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var streamAssert = require('stream-assert');

var webComponents = require('./webComponents');

var fixturesDir = path.join(__dirname, 'fixtures');
var htmlFixtures = fs.readFileSync(path.join(fixturesDir, 'test-element.html')).toString();

describe('tasks', function () {

	it('should ignore empty streams', function (done) {
		gulp.src('*.json')
			.pipe(webComponents())
			.pipe(streamAssert.length(0))
			.pipe(streamAssert.end(done));
	});

	it('should create a file based on a component', function (done) {
		gulp.src(path.join(fixturesDir, 'Test.js'))
			.pipe(webComponents())
			.pipe(streamAssert.first(function (file) {
				assert.deepStrictEqual(file.contents.toString().trim(), htmlFixtures.trim());
				done();
			}));
	});
});

