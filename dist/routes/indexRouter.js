'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexRouter = function () {
  function IndexRouter() {
    _classCallCheck(this, IndexRouter);
  }

  _createClass(IndexRouter, null, [{
    key: 'get',
    value: function get() {
      var router = _express2.default.Router();

      router.get('/', function (req, res, next) {
        res.status(200).send(JSON.parse('{ "isItWorking": "Yes it is!" }'));
      });

      return router;
    }
  }]);

  return IndexRouter;
}();

exports.default = IndexRouter;