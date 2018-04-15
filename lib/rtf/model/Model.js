'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	'use strict';

	var isClass = require('is-class');

	/**
  * Base class for RTF model entries.
  *
  * @class Model
  */

	var Model = function () {
		/**
   * Creates an instance of Model.
   *
   * @param {Model/null} parent
   * @memberOf Model
   */
		function Model(parent) {
			_classCallCheck(this, Model);

			this.children = [];
			this._parent = parent || null;
		}

		_createClass(Model, [{
			key: 'append',
			value: function append(node) {
				this.children.push(node);

				node.setParent(this);
			}
		}, {
			key: 'setParent',
			value: function setParent(parent) {
				this._parent = parent;
			}
		}, {
			key: 'getParent',
			value: function getParent() {
				return this._parent;
			}

			/**
    * @returns {Model/null} Returns last child of this item or `null` if none.
    * @memberOf Model
    */

		}, {
			key: 'getLast',
			value: function getLast() {
				return this.children[this.children.length - 1] || null;
			}

			/**
    * @returns {Model/null} Returns last child of this item or `null` if none.
    * @memberOf Model
    */

		}, {
			key: 'getFirst',
			value: function getFirst() {
				return this.getChild();
			}

			/**
    * Returns the first child matching `criteria`.
    *
    *		// Returns a first child which is instance of Group.
    *		curModel.getChild( Group );
    *
    * @param {Class/Function} [criteria] If no criteria is given the first child is returned.
    * @param {Boolean} [recursive=false]
    * @returns {Model}
    * @memberOf Model
    */

		}, {
			key: 'getChild',
			value: function getChild(criteria, recursive) {
				return this._getChildren(this, criteria, recursive).next().value || null;
			}

			/**
    * Returns an array of children matching `criteria`.
    *
    *		// Returns a first child which is instance of Group.
    *		curModel.getChild( Group );
    *
    * @param {Class/Function} [criteria] If no criteria is given the first child is returned.
    * @param {Boolean} [recursive=false]
    * @returns {Model[]}
    * @memberOf Model
    */

		}, {
			key: 'getChildren',
			value: function getChildren(criteria, recursive) {
				var ret = [];

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this._getChildren(this, criteria, recursive)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var child = _step.value;

						ret.push(child);
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

				return ret;
			}
		}, {
			key: '_getChildren',
			value: function _getChildren(parent, criteria, recursive) {
				var evaluator = this._getEvaluatorFromCriteria(criteria);

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = parent.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var child = _step2.value;

						if (evaluator(child) === true) {
							child;
						}
						if (recursive) {
							this._getChildren(child, criteria, recursive);
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: '_getEvaluatorFromCriteria',
			value: function _getEvaluatorFromCriteria(criteria) {
				var evaluator = void 0;

				if (!criteria) {
					evaluator = function evaluator() {
						return true;
					};
				} else if (isClass(criteria)) {
					evaluator = function evaluator(val) {
						return val instanceof criteria;
					};
				} else if (typeof criteria === 'function') {
					evaluator = criteria;
				} else {
					evaluator = function evaluator() {
						return false;
					};
				}

				return evaluator;
			}
		}]);

		return Model;
	}();

	module.exports = Model;
})();