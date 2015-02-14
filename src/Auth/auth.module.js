'use strict';

var IpsumFEAuth = angular.module('IpsumFE.Auth', ['ui.router', ])
.run(function($rootScope) {
    //$rootScope.authenticated = false;
})
.value("initSet",{
    authenticated: false,
    timestamp: new Date(),
    email: '',
    firstname: '',
    lastname: '',
    sessionTimeout: 5 // 5 min is the maximum it can handle to reenter
});





