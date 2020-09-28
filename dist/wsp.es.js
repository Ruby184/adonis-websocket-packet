var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var NonError = function (_Error) {
	inherits(NonError, _Error);

	function NonError(message) {
		classCallCheck(this, NonError);

		var _this = possibleConstructorReturn(this, (NonError.__proto__ || Object.getPrototypeOf(NonError)).call(this, NonError._prepareSuperMessage(message)));

		Object.defineProperty(_this, 'name', {
			value: 'NonError',
			configurable: true,
			writable: true
		});

		if (Error.captureStackTrace) {
			Error.captureStackTrace(_this, NonError);
		}
		return _this;
	}

	createClass(NonError, null, [{
		key: '_prepareSuperMessage',
		value: function _prepareSuperMessage(message) {
			try {
				return JSON.stringify(message);
			} catch (_) {
				return String(message);
			}
		}
	}]);
	return NonError;
}(Error);

var commonProperties = [{ property: 'name', enumerable: false }, { property: 'message', enumerable: false }, { property: 'stack', enumerable: false }, { property: 'code', enumerable: true }];

var destroyCircular = function destroyCircular(_ref) {
	var from = _ref.from,
	    seen = _ref.seen,
	    to_ = _ref.to_,
	    forceEnumerable = _ref.forceEnumerable;

	var to = to_ || (Array.isArray(from) ? [] : {});

	seen.push(from);

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.entries(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ref2 = _step.value;

			var _ref3 = slicedToArray(_ref2, 2);

			var key = _ref3[0];
			var value = _ref3[1];

			if (typeof value === 'function') {
				continue;
			}

			if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
				to[key] = value;
				continue;
			}

			if (!seen.includes(from[key])) {
				to[key] = destroyCircular({ from: from[key], seen: seen.slice(), forceEnumerable: forceEnumerable });
				continue;
			}

			to[key] = '[Circular]';
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

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = commonProperties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _ref4 = _step2.value;
			var property = _ref4.property;
			var enumerable = _ref4.enumerable;

			if (typeof from[property] === 'string') {
				Object.defineProperty(to, property, {
					value: from[property],
					enumerable: forceEnumerable ? true : enumerable,
					configurable: true,
					writable: true
				});
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

	return to;
};

var serializeError = function serializeError(value) {
	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
		return destroyCircular({ from: value, seen: [], forceEnumerable: true });
	}

	// People sometimes throw things besides Error objects…
	if (typeof value === 'function') {
		// `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
		return '[Function: ' + (value.name || 'anonymous') + ']';
	}

	return value;
};

var deserializeError = function deserializeError(value) {
	if (value instanceof Error) {
		return value;
	}

	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && !Array.isArray(value)) {
		var newError = new Error();
		destroyCircular({ from: value, seen: [], to_: newError });
		return newError;
	}

	return new NonError(value);
};

var serializeError_1 = {
	serializeError: serializeError,
	deserializeError: deserializeError
};
var serializeError_2 = serializeError_1.serializeError;
var serializeError_3 = serializeError_1.deserializeError;

/**
 * adonis-websocket-packet
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Packet codes. The actual packet will have the numbers
 *
 * @type {Object}
 *
 * @example
 * ```
 * {
 *  OPEN: 0,
 *  JOIN: 1,
 *  LEAVE: 2,
 *  JOIN_ACK: 3,
 *  JOIN_ERROR: 4,
 *  LEAVE_ACK: 5,
 *  LEAVE_ERROR: 6,
 *  EVENT: 7,
 *  PING: 8,
 *  PONG: 9,
 *  ACK: 10,
 *  ACK_ERROR: 11
 * }
 * ```
 */
var codes = {
  OPEN: 0,
  JOIN: 1,
  LEAVE: 2,
  JOIN_ACK: 3,
  JOIN_ERROR: 4,
  LEAVE_ACK: 5,
  LEAVE_ERROR: 6,
  EVENT: 7,
  PING: 8,
  PONG: 9,
  ACK: 10,
  ACK_ERROR: 11

  /**
   * Makes sure value is a string. Otherwise exception
   * is raised
   *
   * @method ensureString
   *
   * @param  {String}     input
   * @param  {String}     message
   *
   * @return {void}
   *
   * @private
   */
};function ensureString(input, message) {
  if (!input || typeof input !== 'string') {
    throw new Error(message);
  }
}

/**
 * Makes a packet, by ensuring all required properties
 * exists inside the `props` object
 *
 * @method makePacket
 *
 * @param  {Number}   code
 * @param  {Object}   props
 * @param  {Array}   requiredProps
 * @param  {Array}   optionalProps
 *
 * @return {Object}
 *
 * @private
 */
function makePacket(code, props, requiredProps) {
  var optionalProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  requiredProps.forEach(function (rP) {
    ensureString(props[rP], 'expected ' + rP + ' to be a valid string');
  });
  optionalProps.forEach(function (oP) {
    if (typeof props[oP] === 'undefined') {
      delete props[oP];
    }
  });
  return { t: code, d: props };
}

/**
 * Fns to be exported
 */
var fns = { deserializeError: serializeError_3

  /**
   * Validates if packet code is a `JOIN` code.
   *
   * @method isJoinPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `LEAVE` code.
   *
   * @method isLeavePacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `OPEN` code.
   *
   * @method isOpenPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `JOIN_ACK` code.
   *
   * @method isJoinAckPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `JOIN_ERROR` code.
   *
   * @method isJoinErrorPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `LEAVE_ACK` code.
   *
   * @method isLeaveAckPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `LEAVE_ERROR` code.
   *
   * @method isLeaveErrorPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `EVENT` code.
   *
   * @method isEventPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `PING` code.
   *
   * @method isPingPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `PONG` code.
   *
   * @method isPongPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `ACK` code.
   *
   * @method isAckPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Validates if packet code is a `ACK_ERROR` code.
   *
   * @method isAckErrorPacket
   *
   * @param {Object} packet
   *
   * @return {Boolean}
   */

  /**
   * Dynamically adding `if<Code>Packet` methods. Example
   *
   * `OPEN` will have `isOpenPacket` method
   * `LEAVE_ACK` will have `isLeaveAckPacket` method
   */
};Object.keys(codes).forEach(function (name) {
  var fnName = name.toLowerCase().replace(/^\w|_(\w)/g, function (w, m) {
    return m ? m.toUpperCase() : w.toUpperCase();
  });
  fns['is' + fnName + 'Packet'] = function (packet) {
    return !!(packet && (typeof packet === 'undefined' ? 'undefined' : _typeof(packet)) === 'object' && packet.t === codes[name]);
  };
});

/**
 * Finding if a packet has a topic.
 *
 * @method hasTopic
 *
 * @param  {Object}  packet
 *
 * @return {Boolean}
 */
fns.hasTopic = function (packet) {
  return !!(packet && packet.d && packet.d.topic);
};

/**
 * Makes sure packet is a valid join packet. Do call `isJoinPacket`
 * before calling this method.
 *
 * @method isValidJoinPacket
 *
 * @type {Boolean}
 */
fns.isValidJoinPacket = fns.hasTopic;

/**
 * Makes sure packet is a valid leave packet. Do call `isLeavePacket`
 * before calling this method.
 *
 * @method isValidLeavePacket
 *
 * @type {Boolean}
 */
fns.isValidLeavePacket = fns.hasTopic;

/**
 * Makes sure packet is a valid event packet. Do call `isEventPacket`
 * before calling this method.
 *
 * @method isValidEventPacket
 *
 * @type {Boolean}
 */
fns.isValidEventPacket = fns.hasTopic;

/**
 * Makes sure packet is a valid ack packet. Do call `isAckPacket`
 * before calling this method.
 *
 * @method isValidAckPacket
 *
 * @type {Boolean}
 */
fns.isValidAckPacket = fns.hasTopic;

/**
 * Makes sure packet is a valid ack error packet. Do call `isAckErrorPacket`
 * before calling this method.
 *
 * @method isValidAckErrorPacket
 *
 * @type {Boolean}
 */
fns.isValidAckErrorPacket = fns.hasTopic;

/**
 * Makes a join packet
 *
 * @method joinPacket
 *
 * @param  {String}   topic
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 */
fns.joinPacket = function (topic) {
  return makePacket(codes.JOIN, { topic: topic }, ['topic']);
};

/**
 * Makes a leave packet
 *
 * @method leavePacket
 *
 * @param  {String}    topic
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 */
fns.leavePacket = function (topic) {
  return makePacket(codes.LEAVE, { topic: topic }, ['topic']);
};

/**
 * Makes join acknowledge packet
 *
 * @method joinAckPacket
 *
 * @param  {String}     topic
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or is not a string
 */
fns.joinAckPacket = function (topic) {
  return makePacket(codes.JOIN_ACK, { topic: topic }, ['topic']);
};

/**
 * Makes join error packet
 *
 * @method joinErrorPacket
 *
 * @param  {String}        topic
 * @param  {String}        message
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 * @throws {Error} If message is not defined or not a string
 */
fns.joinErrorPacket = function (topic, message) {
  return makePacket(codes.JOIN_ERROR, { topic: topic, message: message }, ['topic', 'message']);
};

/**
 * Makes leave packet
 *
 * @method leaveAckPacket
 *
 * @param  {String}       topic
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 */
fns.leaveAckPacket = function (topic) {
  return makePacket(codes.LEAVE_ACK, { topic: topic }, ['topic']);
};

/**
 * Makes leave error packet
 *
 * @method leaveErrorPacket
 *
 * @param  {String}         topic
 * @param  {String}         message
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 * @throws {Error} If message is not defined or not a string
 */
fns.leaveErrorPacket = function (topic, message) {
  return makePacket(codes.LEAVE_ERROR, { topic: topic, message: message }, ['topic', 'message']);
};

/**
 * Makes the event packet
 *
 * @method eventPacket
 *
 * @param  {String}    topic
 * @param  {String}    event
 * @param  {Mixed}     data
 * @param  {Number}    id
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 * @throws {Error} If event is not defined
 * @throws {Error} If data is not defined
 */
fns.eventPacket = function (topic, event) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var id = arguments[3];

  return makePacket(codes.EVENT, { topic: topic, event: event, data: data, id: id }, ['topic', 'event'], ['id']);
};

/**
 * Makes ping packet
 *
 * @method pingPacket
 *
 * @return {Object}
 */
fns.pingPacket = function () {
  return { t: codes.PING };
};

/**
 * Makes pong packet
 *
 * @method pongPacket
 *
 * @return {Object}
 */
fns.pongPacket = function () {
  return { t: codes.PONG };
};

/**
 * Makes the ack packet
 *
 * @method ackPacket
 *
 * @param  {String}    topic
 * @param  {Number}    id
 * @param  {Mixed}     data
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 * @throws {Error} If id is not defined
 * @throws {Error} If data is not defined
 */
fns.ackPacket = function (topic, id) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  return makePacket(codes.ACK, { topic: topic, id: id, data: data }, ['topic']);
};

/**
 * Makes join error packet
 *
 * @method ackErrorPacket
 *
 * @param  {String}   topic
 * @param  {Number}   id
 * @param  {Error}   error
 *
 * @return {Object}
 *
 * @throws {Error} If topic is not defined or not a string
 * @throws {Error} If message is not defined or not a string
 */
fns.ackErrorPacket = function (topic, id, error) {
  var isDev = process.env.NODE_ENV && /dev/i.test(process.env.NODE_ENV);

  return makePacket(codes.ACK_ERROR, Object.assign(serializeError_2(error), {
    topic: topic,
    id: id,
    stack: isDev ? error.stack : undefined
  }), ['topic', 'message'], ['name', 'code', 'stack']);
};

var index = Object.assign({ codes: codes }, fns);

export default index;
