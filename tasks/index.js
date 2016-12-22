'use strict';

var gulp = require('gulp');

var checkOptions = require('./options');
var webComponents = require('./webcomponents');

module.exports.register = function(options) {
	var opts = checkOptions(options);

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
