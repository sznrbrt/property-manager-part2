'use strict';

var express = require('express');
var router = express.Router();

var Client = require('../models/client');

// GET /api/clients
router.get('/', (req, res) => {
  Client.find({}, (err, clients) => {
    return err ? res.status(400).send(err) : res.send(clients);
  });
})

// POST /api/clients/filtered
router.post('/filtered', (req, res) => {
  var find = req.body || {};
  Client
    .find(find)
    .exec((err, clients) => {
      return err ? res.status(400).send(err) : res.send(clients);
    });
})

// POST /api/clients
router.post('/', (req, res) => {
  var client = new Client(req.body);
  client.save({new: true}, (err, client) => {
    return err ? res.status(400).send(err) : res.send(client);
  })
})

// DELETE /api/clients/:id
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Client.findByIdAndRemove(id, (err) => {
    if(err) return res.status(400).send(err);
    else res.send(`id: ${id} Document deleted!`);
  })
})

// PUT /api/client/:id
router.put('/:id', (req, res) => {
  var id = req.params.id;
  Client.findByIdAndUpdate(id, { $set: req.body }, {new: true}, (err, client) => {
    if(err) return res.status(400).send(err);
    else res.send(client);
  })
})


module.exports = router;
