'use strict';

var IpsumFEAuth = angular.module('IpsumFE.Auth', ['ui.router', ])
.run(function($rootScope) {
    $rootScope.authenticated = false;
});





