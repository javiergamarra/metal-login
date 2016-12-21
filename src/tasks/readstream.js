'use strict';

var fs = require('fs');

function readStream(path) {
	return new Promise(function (resolve, reject) {
		var buf = new Buffer('');
		var str = fs.createReadStream(path);
		str.on('data', function (chunk, encoding) {
			buf = Buffer.concat([buf, new Buffer(chunk, encoding)]);
		});
		str.on('end', function () { resolve(buf); });
		str.on('error', function (err) { reject(err); });
		return str;
	});
}

module.exports = readStream;
