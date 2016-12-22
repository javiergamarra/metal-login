'use strict';

var path = require('path');
var util = require('util');

var defaultTemplatePath = path.join(__dirname, 'template.html');

function checkOptions(options) {
	var opts = util.isObject(options) ? options : {};
	opts.src = util.isArray(opts.src) || util.isString(opts.src) ? opts.src : [''];
	opts.output = util.isString(opts.output) ? opts.output : '';
	opts.template = util.isString(opts.template) ? opts.template : defaultTemplatePath;
	return opts;
}

module.exports = checkOptions;
