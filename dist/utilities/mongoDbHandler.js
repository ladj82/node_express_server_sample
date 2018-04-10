'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _logHandler = require('./logHandler');

var _logHandler2 = _interopRequireDefault(_logHandler);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoDatabaseHandler = function () {
  function MongoDatabaseHandler() {
    _classCallCheck(this, MongoDatabaseHandler);

    this._client = null;
    this._connectionString = 'mongodb+srv://' + _config2.default.dbUserName + ':' + _config2.default.dbPassword + '@' + _config2.default.dbHost + '/' + _config2.default.dbName;
  }

  _createClass(MongoDatabaseHandler, [{
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var MongoClient;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(this._client === null)) {
                  _context.next = 10;
                  break;
                }

                MongoClient = _mongodb2.default.MongoClient;
                _context.next = 5;
                return MongoClient.connect(this._connectionString);

              case 5:
                this._client = _context.sent;

                if (!this._client) {
                  _context.next = 9;
                  break;
                }

                _logHandler2.default.info('Connected to the database.');
                return _context.abrupt('return', true);

              case 9:
                return _context.abrupt('return', false);

              case 10:
                return _context.abrupt('return', true);

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](0);

                _logHandler2.default.error('Error while connecting to the database.');
                throw _context.t0;

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'disconnect',
    value: function disconnect() {
      try {
        if (this._client !== null) {
          this._client.close();
          this._client = null;

          _logHandler2.default.info('Disconnected from the database.');
        }

        return true;
      } catch (ex) {
        _logHandler2.default.error('Error while disconnecting the database.', '');
        throw err;
      }
    }
  }, {
    key: 'instance',
    get: function get() {
      if (this._client) {
        return this._client.db();
      }

      var errorMessage = 'Error while getting database instance. Make sure the app is connected to the database.';
      _logHandler2.default.error(errorMessage);
      throw new Error(errorMessage);
    }
  }]);

  return MongoDatabaseHandler;
}();

exports.default = new MongoDatabaseHandler();