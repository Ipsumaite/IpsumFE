angular.module('IpsumFE.Channels').config(function ($stateProvider){

    $stateProvider
    .state('subscriptions', {
            templateUrl: 'Channels/views/subscriptions.html',
            url: '/channelssubscriptions',
            controller: 'subscriptionsCtrl'
    })
    .state('mychannels', {
            url: '/channelsmychannels',
            templateUrl: 'Channels/views/mychannels.html',
            controller: 'mychannelsCtrl'
    });
});
