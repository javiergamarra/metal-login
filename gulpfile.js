'use strict';
var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'login.css',
	bundleFileName: 'login.js',
	moduleName: 'metal-login'
});

var gulp = require('gulp');
var gutil = require('gulp-util');
var tasks = require('./src/tasks');
tasks.register({
	globs: 'src/Login.js',
	dest: 'tmp'
});

gulp.on('stop', function () {
	gutil.log('gulp on stop');
	process.nextTick(function () {
		process.exit(0);
	});
});
