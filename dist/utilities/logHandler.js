'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);

    this._engine = new _winston2.default.Logger({
      transports: [new _winston2.default.transports.Console({
        json: true,
        colorize: true,
        silent: ['prd', 'qas'].includes(_config2.default.env)
      })]
    });
  }

  _createClass(Log, [{
    key: 'log',
    value: function log(message) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this._engine.log(['error', 'warn', 'info', 'verbose', 'debug', 'silly'].includes(level) ? level : 'info', message);
    }
  }, {
    key: 'error',
    value: function error(message) {
      this.log(message, 'error');
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      this.log(message, 'warn');
    }
  }, {
    key: 'info',
    value: function info(message) {
      this.log(message, 'info');
    }
  }, {
    key: 'verbose',
    value: function verbose(message) {
      this.log(message, 'verbose');
    }
  }, {
    key: 'debug',
    value: function debug(message) {
      this.log(message, 'debug');
    }
  }, {
    key: 'silly',
    value: function silly(message) {
      this.log(message, 'silly');
    }
  }]);

  return Log;
}();

exports.default = new Log();