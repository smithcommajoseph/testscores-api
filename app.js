
var server = require('./server/server'),
  config = require('config').App
  port = process.env.PORT || config.port;

module.exports = server;

server.init(function(err) {
  if (err) throw err;
  server.start({port: port});
});
