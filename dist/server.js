'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _logHandler = require('./utilities/logHandler');

var _logHandler2 = _interopRequireDefault(_logHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server(app, port) {
    _classCallCheck(this, Server);

    this._app = app;
    this._port = port;
    this._httpServer = null;
  }

  _createClass(Server, [{
    key: 'start',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._app.init();

              case 2:

                this._httpServer = _http2.default.createServer(this._app.instance);
                this._httpServer.listen(this._port);

                this._httpServer.on('listening', function () {
                  _logHandler2.default.info('Running ' + _this._app.toString() + ' and listening on port: ' + _this._httpServer.address().port);
                });

                this._httpServer.on('error', function (err) {
                  _logHandler2.default.error(err);
                });

                return _context.abrupt('return', this._httpServer);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'stop',
    value: function stop() {
      if (this._app) {
        this._app.dispose();
      }

      if (this._httpServer) {
        this._httpServer.close(function () {
          return _logHandler2.default.info('Server stopped.');
        });
      }
    }
  }]);

  return Server;
}();

exports.default = Server;