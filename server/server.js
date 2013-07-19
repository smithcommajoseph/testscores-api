var express = require('express'),
    config = require('config'),
    db = require('./lib/app-db'),
    utils = require('./lib/utils'),
    app = express();

global.appDir = config.App.cwd || process.cwd();

exports.init = function init(callback) {
  callback = callback || function(){};
  _initMiddleware();
  utils.initControllers(app, appDir + '/app/controllers');
  db.connect();
  callback();
};

exports.start = function start(options) {
  options = options || {};
  var port = options.port || config.App.port;
  app.listen(port);
  console.log("server pid " + process.pid + " listening on port " + port + " in " + app.settings.env + " mode");
};

exports.get = function get() { return app; };

function _initMiddleware() {
  app.configure(function() {
    app.use(express.compress());
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(function(req, res){
      res.send('DERP!! Something went wrong');
    });
  });
}
