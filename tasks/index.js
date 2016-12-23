'use strict';

var path = require('path');
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');

var checkOptions = require('./options');
var webComponents = require('./webcomponents');

module.exports.register = function(options) {
	var opts = checkOptions(options);

	// This task separates the HTML and JS from the webcomponent file
	// for the moment, it's just defined to see what output we get.
	gulp.task('vulcanize', ['webcomponents'], function (cb) {
		gulp.src(path.join(opts.output, '*.html'))
			.pipe(vulcanize({
				inlineCss: true,
				inlineSripts: true,
				scriptComments: true
			}))
			.pipe(crisper())
			.pipe(gulp.dest(path.join(opts.output, 'elements')))
			.on('end', function () { cb(); })
			.on('error', function (err) { cb(err); });
	});

	gulp.task('webcomponents', function (cb) {
		gulp.src(opts.src)
			.pipe(webComponents(opts))
			.pipe(gulp.dest(opts.output))
			.on('end', function () { cb(); })
			.on('error', function (err) {
				cb(err);
			});
	});
};
