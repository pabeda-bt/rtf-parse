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
			value: /*#__PURE__*/regeneratorRuntime.mark(function _getChildren(parent, criteria, recursive) {
				var evaluator, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, child;

				return regeneratorRuntime.wrap(function _getChildren$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								evaluator = this._getEvaluatorFromCriteria(criteria);
								_iteratorNormalCompletion2 = true;
								_didIteratorError2 = false;
								_iteratorError2 = undefined;
								_context.prev = 4;
								_iterator2 = parent.children[Symbol.iterator]();

							case 6:
								if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
									_context.next = 16;
									break;
								}

								child = _step2.value;

								if (!(evaluator(child) === true)) {
									_context.next = 11;
									break;
								}

								_context.next = 11;
								return child;

							case 11:
								if (!recursive) {
									_context.next = 13;
									break;
								}

								return _context.delegateYield(this._getChildren(child, criteria, recursive), 't0', 13);

							case 13:
								_iteratorNormalCompletion2 = true;
								_context.next = 6;
								break;

							case 16:
								_context.next = 22;
								break;

							case 18:
								_context.prev = 18;
								_context.t1 = _context['catch'](4);
								_didIteratorError2 = true;
								_iteratorError2 = _context.t1;

							case 22:
								_context.prev = 22;
								_context.prev = 23;

								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}

							case 25:
								_context.prev = 25;

								if (!_didIteratorError2) {
									_context.next = 28;
									break;
								}

								throw _iteratorError2;

							case 28:
								return _context.finish(25);

							case 29:
								return _context.finish(22);

							case 30:
							case 'end':
								return _context.stop();
						}
					}
				}, _getChildren, this, [[4, 18, 22, 30], [23,, 25, 29]]);
			})
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