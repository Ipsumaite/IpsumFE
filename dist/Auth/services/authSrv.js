'use strict';

angular.module('IpsumFE.Auth').factory('authSrv', function ( $http, $q, API_SECURED_URL, API_URL, authtoken) {


            // Public API here
            var authSrv = {
                getEmail: function () {
                    var deferred = $q.defer(),
                        httpPromise = $http.get(API_SECURED_URL + 'readtoken');
                            httpPromise.then(function (response) {
                                deferred.resolve(response);
                            }, function (error) {
                                console.error(error);
                                authtoken.removeToken();
                            });
                            return deferred.promise;
                        },
                signIn:function(user){
                    var deferred = $q.defer(),
                        httpPromise =$http.post(API_URL +'login', user);
                        httpPromise.then(function (response) {
                                deferred.resolve(response);
                        }, function (error) {
                                console.error(error);
                        });
                        return deferred.promise;
                },
                signUp:function(user){
                    var deferred = $q.defer(),
                        httpPromise =$http.post(API_URL +'signup', user);
                        httpPromise.then(function (response) {
                                deferred.resolve(response);
                        }, function (error) {
                                console.error(error);
                        });
                        return deferred.promise;
                }

            };

            return authSrv;

});