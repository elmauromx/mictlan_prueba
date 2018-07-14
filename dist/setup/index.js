'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  app.use((0, _morgan2.default)('common'));
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));
  app.use((0, _cookieParser2.default)());
  app.use((0, _compression2.default)());
  app.use((0, _methodOverride2.default)());
  app.use((0, _cors2.default)());

  app.disable('etag');

  app.get('/', function (req, res) {
    res.send('Hello World');
  });
  app.use('/api/capacity', (0, _capacity2.default)());
  //app.use('/api/file', file());
  //app.use('/api/certificate', certificate());

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
  });
};

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _capacity = require('../capacity');

var _capacity2 = _interopRequireDefault(_capacity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }