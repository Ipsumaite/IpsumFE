'use strict';

angular.module('IpsumFE.Auth').config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

    $stateProvider
    .state('register', {
            templateUrl: 'Auth/views/register.html',
            url: '/register',
            controller: 'registerCtrl'
    })
    .state('login', {
            templateUrl: 'Auth/views/login.html',
            url: '/login',
            controller: 'loginCtrl'
    })
    .state('accountsettings', {
            templateUrl: 'Auth/views/settings.html',
            url: '/accountsettings'
    })
    .state('logout', {
            url: '/logout',
            controller: 'logoutCtrl'
    });
    
    $httpProvider.interceptors.push('authInterceptor');
});
