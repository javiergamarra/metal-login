'use strict';
var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'login.css',
	bundleFileName: 'login.js',
	moduleName: 'metal-login'
});


var tasks = require('./tasks');

tasks.register({
	src: ['src/*.js', '!src/*.soy.js'],
	output: 'tmp'
});

// gulp.on('stop', function () {
// 	process.nextTick(function () {
// 		process.exit(0);
// 	});
// });
