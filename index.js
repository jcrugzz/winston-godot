/*
 * index.js :: main include for winston-godot
 *
 */

var winston = require('winston');
var godot = require('godot');
var util = require('util');

var Client = godot.net.Client;

var Godot = module.exports = function (options) {
  options = options || {};

  //
  // Remark: this must be an intance of a godot client
  //
  winston.Transport.call(this, options);
  if (!options.godot || !(options.godot instanceof Client)) {
    throw new Error('You must pass in an instance of a godot client')
  }

  this.godot = options.godot;
  //
  // TODO: Support more of these godot properties
  //
  this.defaults = ['service'].reduce(function (acc, key) {
    if (options[key]) {
      acc[key] = options[key];
    }
    return acc;
  }, {});


};

module.exports.Godot = Godot;

util.inherits(Godot, winston.Transport);

Godot.prototype.name = 'godot';

winston.transports.Godot = Godot;

Godot.prototype.log = function (level, msg, meta, callback) {
  var self = this;

  if (this.silent) {
    return callback(null, true);
  }
  meta = meta || {};

  var packet = Object.keys(this.defaults)
    .reduce(function (acc, key) {
      acc[key] = meta[key] || this.defaults[key]
      return acc;
    }.bind(this), {}
  );

  var message = winston.clone(meta);
  message.level = level;
  packet.description = msg;
  packet.meta = message;

  function logged() {
    self.emit('logged');
    callback(null, true);
  }

  this.godot.produce(packet);
  logged();
}

