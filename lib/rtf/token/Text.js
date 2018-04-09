'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Token = require('./Token'),
	    TextModel = require('../model/Text');

	/**
  * Text Text.
  *
  * @class Text
  * @abstract
  */

	var Text = function (_Token) {
		_inherits(Text, _Token);

		function Text(value) {
			_classCallCheck(this, Text);

			var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

			_this.value = value;
			return _this;
		}

		/**
   * Checks if Text occurs at the beginning of `code`
   *
   * @param {String} code
   * @returns {Boolean}
   * @memberOf Text
   */


		_createClass(Text, [{
			key: 'match',
			value: function match(code) {
				// Text always matches.
				return true;
			}
		}, {
			key: 'applyToModel',
			value: function applyToModel(model) {
				var lastModelChild = model.getLast(),
				    text = void 0;

				if (lastModelChild && lastModelChild instanceof TextModel) {
					// Current scope has already tailing text, we could merge it. (#6)
					text = lastModelChild;
				} else {
					text = new TextModel(model);
					model.append(text);
				}

				text.appendText(this.value);
			}
		}]);

		return Text;
	}(Token);

	module.exports = Text;
})();