'use strict';

(function () {
	'use strict';

	var Parser = require('./Parser');

	module.exports = new Parser();

	module.exports.model = require('./rtf/model');
})();