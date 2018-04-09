'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Document = require('./rtf/model/Document'),
	    Tokenizer = require('./Tokenizer'),
	    EventEmmiter = require('events'),
	    fsp = require('fs-promise');

	var Parser = function (_EventEmmiter) {
		_inherits(Parser, _EventEmmiter);

		function Parser() {
			_classCallCheck(this, Parser);

			return _possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).apply(this, arguments));
		}

		_createClass(Parser, [{
			key: 'parseString',
			value: function parseString(str) {
				var _this2 = this;

				return new Promise(function (resolve, reject) {
					var doc = new Document(),
					    tokenizer = new Tokenizer(),
					    modelContext = doc;

					tokenizer.on('matched', function (token) {
						return modelContext = _this2._tokenMatched(token, modelContext);
					});

					var tokens = tokenizer.process(str);

					resolve(doc);
				});
			}

			/**
    * Parses a given file and returns a promise that resolves to Document model once parsing is done.
    *
    * @param {String} path Path to a file.
    * @returns {Promise<Document>}
    * @memberOf Parser
    */

		}, {
			key: 'parseFile',
			value: function parseFile(path) {
				var _this3 = this;

				return fsp.readFile(path, {
					encoding: 'utf-8'
				}).then(function (content) {
					return _this3.parseString(content);
				});
			}
		}, {
			key: '_tokenMatched',
			value: function _tokenMatched(token, currentContext) {
				var targetContext = token.applyToModel(currentContext) || currentContext;

				if (targetContext !== currentContext) {
					this.emit('contextChanged', targetContext, currentContext);
				}

				return targetContext;
			}
		}]);

		return Parser;
	}(EventEmmiter);

	;

	module.exports = Parser;
})();