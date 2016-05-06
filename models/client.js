'use strict';

var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone: { type: String, required: true},
  prefNumRooms: { type: Number, required: true},
  status: { type: String },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref:'Property'}]
});

clientSchema.methods.recordProperty = function(propId,cb) {
  this.properties.push(propId);
  this.save(cb);
}

clientSchema.methods.removeProperty = function(cb) {
  this.properties.pop();
  this.save(cb);
}

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
