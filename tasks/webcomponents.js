'use strict';

var Vinyl = require('vinyl');
var util = require('util');
var gutil = require('gulp-util');
var through = require('through2');
var checkOptions = require('./options');
var readStream = require('./readstream');

var componentRegexp = /(class\s+)([A-Za-z]+)(\s+extends\s+\w*Component\s+)/g;

module.exports = function (options) {

	var options = checkOptions(options);

	var outBuffer = null;
	var outFile = null;

	// This is probably not the best name, let's talk about it together
	function webComponents(file, enc, cb) {

		var self = this; // jshint ignore:line

		if (file.isNull()) {
			cb();
			return;
		}

		if (file.isStream()) {
			self.emit('error', new Error('streaming is not supported'));
			cb();
			return;
		}

		// Look for a component definition in the file
		var contents = file.contents.toString();
		var result = componentRegexp.exec(contents);
		if (!result) {
			cb();
			return;
		}


		readStream(options.template).then(function (tpl) {
			// Component name
			var metalId = result[2];

			// Output file name
			outFile = file.path.replace(file.base, '')
				.replace(/\.\w+$/, '')
				.concat('-element.html')
				.toLowerCase();

			outBuffer = writeOutput(tpl, metalId, outFile);

			cb();
		}).catch(function (err) {
			self.emit('error', err);
			cb(err);
		});
	}

	function writeOutput(tplBuffer, metalId, fileName) {
		var options = {
			metalId: metalId,
			elementName: metalId + 'Element',
			tagName: 'metal-' + metalId.toLowerCase(),
			templateId: metalId.toLowerCase() + '-element-template',
			file: fileName,
			namespace: 'metal'
		};
		return new Buffer(gutil.template(tplBuffer.toString(), options));
	}

	function endStream(cb) {
		if (!outBuffer || !outFile) {
			cb();
			return;
		}

		var out = new Vinyl({ path: './' + outFile, contents: outBuffer });
		this.push(out); // jshint ignore:line
		cb();
	}

	return through.obj(webComponents, endStream);
};
