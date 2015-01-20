'use strict';

var Myapp = angular.module('IpsumFE', ['ui.router', 'IpsumFE.Auth','IpsumFE.Admin'])
.run(function($rootScope) {
    $rootScope.test2 = false;
});



