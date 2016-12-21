'use strict';

var gutil = require('gulp-util');

var componentRegexp = /(class\s+)([A-Za-z]+)(\s+extends\s+\w*Component\s+)/g;

function createTemplate(fileBuffer, tplBuffer, fileName) {
	return new Promise(function (resolve, reject) {
		var contents = fileBuffer.contents.toString();
		var result = componentRegexp.exec(contents);
		if (result) {
			var name = result[2];
			var options = {
				metalId: name,
				elementName: name + 'Element',
				tagName: 'metal-' + name.toLowerCase(),
				templateId: name.toLowerCase() + '-element-template',
				file: fileName,
				namespace: 'metal'
			};
			var tplContents = new Buffer(gutil.template(tplBuffer.toString(), options));
			resolve(tplContents);
		}
	});
}

module.exports = createTemplate;
