'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _config = require('./utilities/config');

var _config2 = _interopRequireDefault(_config);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _indexRouter = require('./routes/indexRouter');

var _indexRouter2 = _interopRequireDefault(_indexRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppExpress = function (_App) {
  _inherits(AppExpress, _App);

  function AppExpress(db) {
    _classCallCheck(this, AppExpress);

    var _this = _possibleConstructorReturn(this, (AppExpress.__proto__ || Object.getPrototypeOf(AppExpress)).call(this, db));

    _this._app = null;
    return _this;
  }

  _createClass(AppExpress, [{
    key: 'toString',
    value: function toString() {
      return 'Express App';
    }
  }, {
    key: 'init',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(AppExpress.prototype.__proto__ || Object.getPrototypeOf(AppExpress.prototype), 'init', this).call(this);

              case 2:

                this._app = (0, _express2.default)();
                this._setupUtilities();
                this._setupRouteLogger();
                this._setupRoutes();
                this._setupErrorLogger();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'dispose',
    value: function dispose() {
      return _get(AppExpress.prototype.__proto__ || Object.getPrototypeOf(AppExpress.prototype), 'dispose', this).call(this);
    }
  }, {
    key: '_setupUtilities',
    value: function _setupUtilities() {
      this._app.use((0, _cors2.default)());
      this._app.use((0, _compression2.default)());
      this._app.use(_bodyParser2.default.urlencoded({ extended: true }));
      this._app.use(_bodyParser2.default.json());
    }
  }, {
    key: '_setupRouteLogger',
    value: function _setupRouteLogger() {
      this._app.use(_expressWinston2.default.logger({
        transports: [new _winston2.default.transports.Console({
          json: true,
          colorize: true,
          silent: ['prd', 'qas'].includes(_config2.default.env)
        })],
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: false,
        ignoreRoute: function ignoreRoute(req, res) {
          return false;
        }
      }));
    }
  }, {
    key: '_setupRoutes',
    value: function _setupRoutes() {
      this._app.use(_indexRouter2.default.get());
    }
  }, {
    key: '_setupErrorLogger',
    value: function _setupErrorLogger() {
      this._app.use(_expressWinston2.default.errorLogger({
        transports: [new _winston2.default.transports.Console({
          json: true,
          colorize: true,
          silent: ['prd', 'qas'].includes(_config2.default.env)
        })]
      }));
    }
  }, {
    key: 'instance',
    get: function get() {
      if (this._app) {
        return this._app;
      }

      var errorMessage = 'Error while getting app instance. Make sure the app was initialized.';
      Log.error(errorMessage);
      throw new Error(errorMessage);
    }
  }]);

  return AppExpress;
}(_app2.default);

exports.default = AppExpress;