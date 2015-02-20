'use strict';

angular.module('IpsumFE.Channels').factory('mychannelsSrv', function ($window, $http, $q, API_SECURED_URL) {


    // Public API here
    var mychannels = {
        getAll: function (email) {
            var deferred = $q.defer(),
                httpPromise = $http.get(API_SECURED_URL + 'mychannels/' + email);
            httpPromise.then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                console.error(error);
            });
            return deferred.promise;
        }
    
    };

    return mychannels;

});