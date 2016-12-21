'use strict';

var util = require('util');
var gulp = require('gulp');
var gutil = require('gulp-util');

var webComponents = require('./webcomponents');

function checkGlobs(globs) {
	return util.isArray(globs) || util.isString(globs) ? globs : [''];
}

function checkOptions(options) {
	options = util.isObject(options) ? options : {};
	options.globs = checkGlobs(options.globs);
	options.dest = util.isString(options.dest) ? options.dest : '';
	return options;
}

module.exports.register = function register(options) {
	var options = checkOptions(options);

	gulp.task('webcomponents', function (cb) {
		gulp.src(options.globs)
			.pipe(webComponents(options))
			.pipe(gulp.dest(options.dest))
			.on('end', function () { cb(); })
			.on('error', function (err) {
				cb(err);
			});
	});
};
