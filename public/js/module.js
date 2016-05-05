'use strict';

var app = angular.module('propertyManagerApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('properties', {
      url:'/',
      templateUrl: '/html/properties.html',
      controller: 'propertiesCtrl',
    })
    .state('editproperty', {
      url:'/editproperty/:id',
      templateUrl: '/html/editproperty.html',
      controller: 'editPropertyCtrl',
    })
    .state('clients', {
      url:'/clients/',
      templateUrl: '/html/clients.html',
      controller: 'clientsCtrl',
    })
    .state('editclient', {
      url:'/editclient/:id',
      templateUrl: '/html/editclient.html',
      controller: 'editClientCtrl',
    })

  $urlRouterProvider.otherwise('/');
});
