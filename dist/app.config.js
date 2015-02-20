'use strict';

angular.module('IpsumFE').config(function ($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
    .state('home', {
            templateUrl: 'Main/home.html',
            url: '/',
            controller: 'homeCtrl'
    })
    .state('about', {
            templateUrl: 'Main/about.html',
            url: '/about'
    })
    .state('error404', {
            templateUrl: 'Main/error404.html',
            url: '/error404'
    })
    .state('module1', {
            templateUrl: 'Main/about.html',
            url: '/module1'
    });
    

    $urlRouterProvider.otherwise(function ($injector, $location) {
            console.log("IPSUMFE route not found");
            $injector.invoke(['$state', function ($state) { $state.go('error404'); }]);
            return true;
    });
    $locationProvider.html5Mode(true);

})
.constant('API_URL', 'http://firebase-experiment-195611.euw1-2.nitrousbox.com:3000/')
.constant('API_SECURED_URL', 'http://firebase-experiment-195611.euw1-2.nitrousbox.com:3000/api/');
