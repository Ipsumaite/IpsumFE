'use strict';

angular.module('Myapp').config(function ($stateProvider, $urlRouterProvider, $locationProvider){
  
    // For any unmatched url, send to /error404.html
    //$urlRouterProvider.otherwise("error404");
    
    $stateProvider
    .state('home', {
            templateUrl: 'Main/home.html',
            url: '/'
    })
    .state('error404', {
            templateUrl: 'Main/error404.html',
            url: '/error404'
    });
    

    $urlRouterProvider.otherwise(function ($injector, $location) {
            console.log("Not found");
            $injector.invoke(['$state', function ($state) { $state.go('error404'); }]);
            return true;
    });
    $locationProvider.html5Mode(true);
});
