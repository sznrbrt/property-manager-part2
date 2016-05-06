'use strict';

var app = angular.module('propertyManagerApp');

app.service('Properties', function($http) {

  this.getAll = () => {
    return $http.get('./api/properties/');
  }
  this.getFiltered = (filterObj) => {
    return $http.post('./api/properties/filtered', filterObj);
  }
  this.create = (property) => {
    return $http.post('/api/properties/', property);
  }
  this.delete = (id) => {
    return $http.delete(`/api/properties/${id}`);
  }
  this.edit = (id, editedProperty) => {
    return $http.put(`/api/properties/${id}`, editedProperty);
  }

  this.removeClient = (propId, clientId) => {
    return $http.put(`/api/properties/${propId}/removeclient/${clientId}`);
  }
})

app.service('Clients', function($http) {

  this.getAll = () => {
    return $http.get('./api/clients/');
  }
  this.getById = (id) => {
    return $http.get(`./api/clients/${id}`);
  }
  this.getFiltered = (filterObj) => {
    return $http.post('./api/clients/filtered', filterObj);
  }
  this.create = (client) => {
    return $http.post('/api/clients/', client);
  }
  this.delete = (id) => {
    return $http.delete(`/api/clients/${id}`);
  }
  this.edit = (id, editedClient) => {
    return $http.put(`/api/clients/${id}`, editedClient);
  }
})

app.service('StoreData', function($http) {
  var storeData = {};
  this.get = () => { return storeData }
  this.set = (data) => { storeData = data }
})
