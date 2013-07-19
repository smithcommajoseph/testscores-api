var config = require('config'),
    mongoose = require('mongoose');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', console.log.bind(console, 'successfully connected to MongoDB'));
mongoose.connection.once('close', console.log.bind(console, 'successfully disconnected from MongoDB'));

exports.connect = function connect() {
  mongoose.connect(config.MongoDB.url);
};

exports.disconnect = function disconnect() {
    mongoose.disconnect();
};

module.exports.mongoose = mongoose;
module.exports.Schema = mongoose.Schema;
