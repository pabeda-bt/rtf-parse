'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Command = require('../Command'),
	    PictureModel = require('../../model/command/Picture');

	var Picture = function (_Command) {
		_inherits(Picture, _Command);

		function Picture(matchedText) {
			_classCallCheck(this, Picture);

			var _this = _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).call(this, matchedText));

			_this.tokenRegexp = /\\pict ?/;
			return _this;
		}

		_createClass(Picture, [{
			key: 'applyToModel',
			value: function applyToModel(model) {
				var modelParent = model.getParent();

				// We don't want to create pictures that are children of nonshppict, as it's a deprecated construction.
				if (!modelParent || !modelParent.getChild(function (child) {
					return child.name === 'nonshppict';
				}, true)) {
					model.append(new PictureModel(this.value));
				} else {
					return _get(Picture.prototype.__proto__ || Object.getPrototypeOf(Picture.prototype), 'applyToModel', this).call(this, model);
				}
			}
		}]);

		return Picture;
	}(Command);

	module.exports = Picture;
})();