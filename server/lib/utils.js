var fs = require('fs'),
    path = require('path'),
    findItSync = require('findit').sync;

exports.initControllers = function getControllers(app, controllersDir){
  var controllers = findItSync(controllersDir),
      controller,
      r = /.*\.js?/;
  controllers.forEach(function(controllerName) {
    if (!r.test(controllerName)) return;
    controller = require(controllerName);
    controller.init(app);
  });
};
