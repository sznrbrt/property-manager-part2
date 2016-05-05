'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
  address: { type: String, required: true},
  status: { type: String, required: true, default: 'N/A'},
  roomNum: { type: Number, required: true},
  rentPrice: { type: Number, required: true},
  utilCost: { type: Number},
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client'}]
});

propertySchema.statics.addClient = function(propId, clientId, callback) {
  Property.findById(propId, (err, property) => {
    if(err) return callback(err)
    property.tenants.push(clientId);

    property.save((err, savedProperty) => {
      callback(err || savedProperty);
    })
  });
}

propertySchema.statics.removeClient = function(propId, clientId, callback) {
  Property.findById(propId, (err, property) => {
    if(err) return callback(err)
    property.tenants = property.tenants.filter((tenantId) => {return tenantId.toString() !== clientId.toString()});

    property.save((err) => {
      callback(err);
    })
  });
}

var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
