'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	'use strict';

	/**
  * A generic class for any RTF token/node.
  *
  * @class Token
  * @abstract
  */

	var Token = function () {
		function Token() {
			_classCallCheck(this, Token);

			this.tokenRegexp = null;
		}

		/**
   * Checks if Token occurs in the given `code`.
   *
   * 		// Assuming groupOpenToken matches "{" character.
   *		groupOpenToken.match( 'foo {\bar baz} {\bom}' );
   *		// Evaluates to [ 4, '{' ]
   *
   * @param {String} code
   * @returns {Array/Boolean} `false` if token was not matched.
   * @memberOf Token
   */


		_createClass(Token, [{
			key: 'match',
			value: function match(code) {
				if (!this.tokenRegexp) {
					throw new EvalError('Missing tokenRegexp property!');
				}

				code = String(code);

				var match = this.tokenRegexp.exec(code);

				return match ? [match.index, match[0]] : false;
			}

			/**
    * Applies changes to current RTF model based on this token.
    *
    * @param {Model} model Current model context.
    * @returns {Model/null} If Model instance is returned it means that the parser should change context to the returned instance.
    * @memberOf Token
    */

		}, {
			key: 'applyToModel',
			value: function applyToModel(model) {
				throw new Error('Method not implemented!');
			}
		}]);

		return Token;
	}();

	module.exports = Token;
})();