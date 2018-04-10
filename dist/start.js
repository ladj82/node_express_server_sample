'use strict';

require('babel-polyfill');

var _config = require('./utilities/config');

var _config2 = _interopRequireDefault(_config);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _mongoDbHandler = require('./utilities/mongoDbHandler');

var _mongoDbHandler2 = _interopRequireDefault(_mongoDbHandler);

var _appExpress = require('./appExpress');

var _appExpress2 = _interopRequireDefault(_appExpress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appServer = new _server2.default(new _appExpress2.default(_mongoDbHandler2.default), _config2.default.serverPort);

appServer.start();