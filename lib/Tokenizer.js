'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Text = require('./rtf/token/Text'),
	    EventEmitter = require('events');

	var Tokenizer = function (_EventEmitter) {
		_inherits(Tokenizer, _EventEmitter);

		function Tokenizer() {
			_classCallCheck(this, Tokenizer);

			var _this = _possibleConstructorReturn(this, (Tokenizer.__proto__ || Object.getPrototypeOf(Tokenizer)).call(this));

			_this.splitRegExp = new RegExp(Tokenizer.RTF_NEW_LINE, 'm');
			_this._loadTokens();
			return _this;
		}

		/**
   * Parses given RTF code and returns an array of tokens.
   *
   * @param {String} code RTF code to be parsed.
   * @returns {Token[]} An array of parsed tokens based on `code` provided.
   * @memberOf Tokenizer
   */


		_createClass(Tokenizer, [{
			key: 'process',
			value: function process(code) {
				var remaining = String(code),
				    separatorMatch = null,
				    chunk = null,
				    ret = [];

				// Tokenizer splits RTF content into chunks per space / new line.
				while (chunk || remaining) {
					if (!chunk) {
						// Current chunk has been processed, get a new one.
						separatorMatch = this.splitRegExp.exec(remaining);
						chunk = separatorMatch ? remaining.substr(0, separatorMatch.index) : remaining;
						remaining = separatorMatch ? remaining.substr(separatorMatch.index + separatorMatch[0].length) : null;
					}

					var _processChunk2 = this._processChunk(chunk),
					    _processChunk3 = _slicedToArray(_processChunk2, 2),
					    matchedText = _processChunk3[0],
					    matchedToken = _processChunk3[1];

					// Update current chunk.


					chunk = chunk.substr(matchedText.length);

					ret.push(matchedToken);
				}

				return ret;
			}

			/**
    * New line feed used in RTF files.
    *
    * @readonly
    * @static
    * @memberOf Tokenizer
    */

		}, {
			key: '_processChunk',


			/**
    * Processes a single chunk of RTF code.
    *
    * @private
    * @param {String} chunk
    * @returns {Array} An array of: `[ matchedText:String, closestMatch:Token ]`.
    * @memberOf Tokenizer
    */
			value: function _processChunk(chunk) {
				var closestMatch = null,
				    matchedText = null,

				// At what offset the token was matched?
				matchIndex = null;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var token = _step.value;

						var tokenMatched = token.match(chunk);

						// Only overwrite closest match if:
						// 1. No token has been matched so far.
						// 2. ... or this token has been found closer to the end of a string than the former one.
						if (tokenMatched && (matchIndex === null || tokenMatched[0] < matchIndex)) {
							closestMatch = token;
							matchIndex = tokenMatched[0];
							matchedText = tokenMatched[1];
						}

						if (matchIndex === 0) {
							// Any token matched at 0 index, takes highest priority, and means no further processing is needed.
							break;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				if (matchIndex !== 0) {
					// console.log( `not having a perfect match (${matchIndex}) :(( using text` );

					// No match perfect match, so we'll create a text run all the way until a best match. The best
					// match will be picked in next iteration at offset 0.
					matchedText = matchIndex !== null ? chunk.substring(0, matchIndex) : chunk;
					closestMatch = new Text(matchedText);
					matchIndex = 0;
				} else {
					// @todo: until there's no difference between token and model, we need to use the following.
					closestMatch = new closestMatch.constructor(matchedText);
				}

				this.emit('matched', closestMatch);

				return [matchedText, closestMatch];
			}

			/**
    * Sets up known tokens array.
    *
    * @memberOf Tokenizer
    */

		}, {
			key: '_loadTokens',
			value: function _loadTokens() {
				var Group = require('./rtf/token/Group'),
				    GroupEnd = require('./rtf/token/GroupEnd'),
				    Picture = require('./rtf/token/command/Picture'),
				    Command = require('./rtf/token/Command'),
				    Escape = require('./rtf/token/Escape');

				this.tokens = [new Group(), new GroupEnd(), new Picture(), new Command()];

				// It's important to put Escape token at the end as it's the last one that should be used.
				this.tokens.push(new Escape());
			}
		}], [{
			key: 'RTF_NEW_LINE',
			get: function get() {
				return '\r\n';
			}
		}]);

		return Tokenizer;
	}(EventEmitter);

	module.exports = Tokenizer;
})();