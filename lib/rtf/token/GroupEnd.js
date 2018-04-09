'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Token = require('./Token');

	var GroupEnd = function (_Token) {
		_inherits(GroupEnd, _Token);

		function GroupEnd() {
			_classCallCheck(this, GroupEnd);

			var _this = _possibleConstructorReturn(this, (GroupEnd.__proto__ || Object.getPrototypeOf(GroupEnd)).call(this));

			_this.tokenRegexp = /\}/;
			return _this;
		}

		_createClass(GroupEnd, [{
			key: 'applyToModel',
			value: function applyToModel(model) {
				// With group end we simply want to change the content back to the parent group.
				return model._parent;
			}
		}]);

		return GroupEnd;
	}(Token);

	module.exports = GroupEnd;
})();