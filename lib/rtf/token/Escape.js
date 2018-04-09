'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var TextToken = require('./Text'),
	    Token = require('./Token');

	/**
  * Escape token.
  *
  * @class Escape
  * @extends {Token}
  */

	var Escape = function (_TextToken) {
		_inherits(Escape, _TextToken);

		function Escape(value) {
			_classCallCheck(this, Escape);

			var _this = _possibleConstructorReturn(this, (Escape.__proto__ || Object.getPrototypeOf(Escape)).call(this, value));

			_this.tokenRegexp = /\\./;
			return _this;
		}

		_createClass(Escape, [{
			key: 'match',
			value: function match(code) {
				return Token.prototype.match.call(this, code);
			}
		}]);

		return Escape;
	}(TextToken);

	module.exports = Escape;
})();