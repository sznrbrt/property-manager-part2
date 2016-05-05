'use strict';

var express = require('express');
var router = express.Router();

var Property = require('../models/property');

// GET /api/properties
router.get('/', (req, res) => {
  Property
    .find({})
    .populate('tenants')
    .exec((err, properties) => {
      return err ? res.status(400).send(err) : res.send(properties);
    });
})

// GET /api/properties
router.post('/filtered', (req, res) => {
  var find = req.body || {};
  Property
    .find(find)
    .exec((err, properties) => {
      return err ? res.status(400).send(err) : res.send(properties);
    });
})

// POST /api/properties
router.post('/', (req, res) => {
  var property = new Property(req.body);
  property.save({new: true}, (err, property) => {
    return err ? res.status(400).send(err) : res.send(property);
  })
})

// DELETE /api/properties/:id
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Property.findByIdAndRemove(id, (err) => {
    if(err) return res.status(400).send(err);
    else res.send(`id: ${id} Document deleted!`);
  })
})

// PUT /api/properties/:id
router.put('/:id', (req, res) => {
  var id = req.params.id;
  Property.findByIdAndUpdate(id, { $set: req.body }, {new: true}, res.handle)
})

// PUT /api/properties/:propId/addclient/:clientId
router.put('/:propId/addclient/:clientId', (req, res) => {
  var propId = req.params.propId;
  var clientId = req.params.clientId;
  Property.addClient(propId, clientId,   (err, savedProperty) => {
        res.status(err ? 400 : 200).send(err || savedProperty);
  });
})

// PUT /api/properties/:propId/removeclient/:clientId
router.put('/:propId/removeclient/:clientId', (req, res) => {
  var propId = req.params.propId;
  var clientId = req.params.clientId;
  Property.removeClient(propId, clientId, (err) => {
    res.status(err ? 400 : 200).send(err || 'Success!');
  });
})




module.exports = router;
