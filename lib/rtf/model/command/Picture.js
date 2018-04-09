'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var Command = require('../Command'),
	    Text = require('../Text');

	var Picture = function (_Command) {
		_inherits(Picture, _Command);

		function Picture() {
			_classCallCheck(this, Picture);

			return _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).apply(this, arguments));
		}

		_createClass(Picture, [{
			key: 'getPicture',

			/**
    * Returns a buffer containing the image.
    *
    * @returns {Buffer}
    * @memberOf Picture
    */
			value: function getPicture() {
				var input = this._getImageText(),
				    inputLen = input.length,
				    buffer = Buffer.alloc(inputLen / 2);

				for (var i = 0; i < inputLen; i += 2) {
					buffer.writeUInt8(parseInt(input.substr(i, 2), 16), i ? i / 2 : 0);
				}

				return buffer;
			}

			/**
    * Browser-friendly version of {@link #getPicture}.
    *
    * @returns {String} Returns picture data as a string.
    * @memberOf Picture
    */

		}, {
			key: 'getPictureAsString',
			value: function getPictureAsString() {
				var input = this._getImageText(),
				    inputLen = input.length,
				    ret = '',
				    i;

				for (i = 0; i < inputLen; i += 2) {
					ret += String.fromCharCode(parseInt(input.substr(i, 2), 16));
				}
				return ret;
			}

			/**
    * @returns {String} Mime type of the image, e.g. `image/png`.
    * @memberOf Picture
    */

		}, {
			key: 'getType',
			value: function getType() {
				var blip = this.getParent().getChild(function (child) {
					return child instanceof Command && child.name.endsWith('blip');
				});

				if (blip) {
					return 'image/' + blip.name.replace('blip', '');
				}

				return 'image/bmp';
			}
		}, {
			key: '_getImageText',
			value: function _getImageText() {
				return this.getParent().getChild(Text).value;
			}
		}]);

		return Picture;
	}(Command);

	module.exports = Picture;
})();