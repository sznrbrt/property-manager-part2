'use strict';

var app = angular.module('propertyManagerApp');

app.controller('propertiesCtrl', function($scope, $rootScope, $state, $stateParams, Properties, StoreData, Clients) {
  $scope.newProperty = {};
  Properties.getAll()
    .then((res) => {
      $scope.properties = res.data;
    })
    .catch(err => {
      console.error(err);
    });

  $scope.showAll = () => {
    Properties.getAll()
    .then((res) => {
      $scope.properties = res.data;
    })
    .catch(err => {
      console.error(err);
    });
  }

  $scope.openAddProperty = () => {
    Clients.getFiltered({ properties: {$size: 0} })
      .then((res) => {
        $scope.possibleTenants = res.data;
        $scope.addingProperty = true;
      })
      .catch(err => {
        console.error(err);
      });
  }

  $scope.showOnlyFiltered = (filterObj) => {
    Properties.getFiltered(filterObj)
      .then((res) => {
        $scope.properties = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  $scope.removeTenant = (propId, tenant, property) => {
    var propIdx = $scope.properties.indexOf(property);
    var tenantIdx = $scope.properties[propIdx].tenants.indexOf(tenant);

    Properties.removeClient(propId, tenant._id)
      .then((res) => {
        $scope.properties[propIdx].tenants.splice(tenantIdx, 1);
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  $scope.addNewProperty = () => {
    var newProp = $scope.newProperty;
    if(!newProp.address || !newProp.status) return;
    if(!newProp.roomNum || !newProp.rentPrice) return;
    var tenantsArr = [];
    for(var id in newProp.tenants) {
      if(newProp.tenants[id]) tenantsArr.push(id);
    }
    newProp.tenants = tenantsArr;
    Properties.create(newProp)
      .then((res) => {
        $scope.properties.push(res.data);
        $scope.clear();
      });
  }

  $scope.removeProp = function (property) {
    var index = $scope.properties.indexOf(property);
    var id = property._id;
    Properties.delete(id)
    .then(() => {
      $scope.properties.splice(index, 1);
    })
    .catch(err => {
      console.error(err);
    });
  }

  $scope.editProp = function (property) {
    console.log(property);
    StoreData.set(property);
    $state.go('editproperty', {'id': property._id});
  }

  $scope.clear = () => {
    $scope.newProperty = {};
    $scope.addingProperty = false;
  }
})

app.controller('editPropertyCtrl', function($scope, $rootScope, Properties, $state, $stateParams, StoreData) {
  var data = StoreData.get();
  $scope.editedProperty = angular.copy(data);

  $scope.cancel = function() {
    $state.go('properties');
  }

  $scope.reset = function() {
    $scope.editedProperty = angular.copy(data);
  }

  $scope.editProperty = function() {
    var input = $scope.editedProperty;
    Properties.edit(input._id, input)
    .then(() => {
      $state.go('properties');
    })
  }

})

app.controller('clientsCtrl', function($scope, $rootScope, $state, $stateParams, StoreData, Clients) {
  $scope.newClient = {};
  Clients.getAll()
    .then((res) => {
      $scope.clients = res.data;
    })
    .catch(err => {
      console.error(err);
    });

  $scope.showAll = () => {
    Clients.getAll()
      .then((res) => {
        $scope.clients = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  $scope.showOnlyFiltered = (filterObj) => {
    Clients.getFiltered(filterObj)
      .then((res) => {
        $scope.clients = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  $scope.openAddClient = () => {
    $scope.addingClient = true;
  }

  $scope.addNewClient= () => {
    var newClient = $scope.newClient;
    if(!newClient.name || !newClient.email) return;
    if(!newClient.phone || !newClient.prefNumRooms) return;

    Clients.create(newClient)
      .then((res) => {
        $scope.clients.push(res.data);
        $scope.clear();
      });
  }

  $scope.removeClient = function (client) {
    var index = $scope.clients.indexOf(client);
    var id = client._id;
    Clients.delete(id)
    .then(() => {
      $scope.clients.splice(index, 1);
    })
    .catch(err => {
      console.error(err);
    });
  }

  $scope.editClient = function (client) {
    StoreData.set(client);
    $state.go('editclient', {'id': client._id});
  }

  $scope.clear = () => {
    $scope.newClient = {};
    $scope.addingClient = false;
  }
})

app.controller('editClientCtrl', function($scope, $rootScope, Clients, $state, $stateParams, StoreData) {
  var data = StoreData.get();
  $scope.editedClient = angular.copy(data);

  $scope.cancel = function() {
    $state.go('clients');
  }

  $scope.reset = function() {
    $scope.editedClient = angular.copy(data);
  }

  $scope.editClient = function() {
    var input = $scope.editedClient;
    Clients.edit(input._id, input)
    .then(() => {
      $state.go('clients');
    })
  }

})
