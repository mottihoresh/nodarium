'use strict';

angular.module('mean.arduino').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('arduino example page', {
      url: '/arduino/example',
      templateUrl: 'arduino/views/index.html'
    });
  }
]);
