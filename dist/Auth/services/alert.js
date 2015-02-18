'use strict';

angular.module('IpsumFE.Auth').service('alert', function alert($rootScope, $timeout){
    var alertTimeout;
    return function(type, title, message, timeout){
        $rootScope.alert = {
            hasBennShown: true,
            show: true,
            type: type,
            message: "  " + message,
            title: title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function(){
            $rootScope.alert.show = false;
        }, timeout || 3000);
        
    }
});