'use strict';

var path = require('path');
var process = require('process');
var stream = require('stream');
var util = require('util');
var Vinyl = require('vinyl');
var readStream = require('./readstream');
var createTemplate = require('./template');

var defaultTemplate = path.join(__dirname, 'webcomponent-tpl.html');

module.exports = function (options) {
	return new WebComponents(options);
};

function WebComponents(options) {
	options = util.isObject(options) ? options : {};
	options = util._extend(options, {objectMode: true});
	stream.Transform.call(this, options);

	this.templatePath = util.isString(options.templatePath) ? options.templatePath : defaultTemplate;
}
util.inherits(WebComponents, stream.Transform);

WebComponents.prototype._transform = function (chunk, encoding, cb) {
	var self = this;

	if (chunk.isStream() || !chunk.isBuffer()) {
		return Promise.reject(cb);
	}

	return readStream(this.templatePath)
		.then(function (data) {

			var file = chunk.path.replace(chunk.base, '')
				.replace(/\.\w+$/, '')
				.concat('-element.html')
				.toLowerCase();

			return createTemplate(chunk, data, file).then(function (data) {
				var output = new Vinyl({ path: './' + file, contents: data });
				self.push(output);
				self.emit('end');
				Promise.resolve(cb());
			});
		})
		.catch(function (err) {
			cb(err);
			return Promise.reject(err);
		});
};

