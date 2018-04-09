'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Model = require('./Model');

	var Command = function (_Model) {
		_inherits(Command, _Model);

		function Command(parent) {
			_classCallCheck(this, Command);

			/**
    * @property {String} name Name of the command.
    * @memberOf Command
    */
			var _this = _possibleConstructorReturn(this, (Command.__proto__ || Object.getPrototypeOf(Command)).call(this, parent));

			_this.name = '';
			_this.value = '';
			return _this;
		}

		_createClass(Command, [{
			key: 'value',
			set: function set(val) {
				this._value = val;
				this.name = Command._resolveName(val) || '';
			},
			get: function get() {
				return this._value;
			}

			/**
    * Returns command name picked from command token.
    *
    * E.g. for `"\foobar "` token it would return `"foobar"` string.
    *
    * @private
    * @param {String} value Text value picked by parser.
    * @returns {String/null}
    * @memberOf Command
    */

		}], [{
			key: '_resolveName',
			value: function _resolveName(value) {
				var match = value.match(/\\([a-z]+(-?[0-9]+)?) ?/);

				return match ? match[1] : null;
			}
		}]);

		return Command;
	}(Model);

	module.exports = Command;
})();