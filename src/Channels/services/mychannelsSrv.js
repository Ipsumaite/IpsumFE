'use strict';

angular.module('IpsumFE.Channels').factory('mychannelsSrv', function ( $http, $q, API_SECURED_URL) {


    // Public API here
    var mychannels = {
        getAll: function (email, method) {
            var deferred = $q.defer(),
                httpPromise = $http.get(API_SECURED_URL + method + '/' + email);
            httpPromise.then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                console.error(error);
            });
            return deferred.promise;
        },
        sync: function(channels, method){
            var deferred = $q.defer(),
            httpPromise =$http.post(API_SECURED_URL +method, channels);
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