angular.module('IpsumFE.Contents').config(function ($stateProvider){

    $stateProvider
    .state('publish', {
            templateUrl: 'Contents/views/publish.html',
            url: '/publish',
            controller: 'publishCtrl'
    })
    .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'Contents/views/dashboard.html',
            controller: 'dashboardCtrl'
    });
});
