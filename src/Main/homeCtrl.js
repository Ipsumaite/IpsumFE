'use strict';


angular.module('IpsumFE').controller('homeCtrl', function ($scope, authtoken, $rootScope, initSet) {

    // If the last login session in the browser was more than the sesionTimeout user must logon again
    var t2 = new Date(authtoken.getTokenDate());
    var t1 = initSet.timestamp;
    var tgap = (t1.getTime() - t2.getTime()) / (60 * 1000);

    if (authtoken.isAuthenticated() && false == initSet.authenticated && tgap >= initSet.sessionTimeout) {
        authtoken.removeToken();
    }

    if (authtoken.isAuthenticated() && false == initSet.authenticated && tgap <= initSet.sessionTimeout) {
        authtoken.setTokenDate();
    }


});