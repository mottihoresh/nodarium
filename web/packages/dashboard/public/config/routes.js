'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('dashboard example page', {
            url: '/dashboard/example',
            templateUrl: 'dashboard/views/index.html'
        });
    }
]);
