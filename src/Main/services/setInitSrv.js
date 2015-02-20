'use strict';

angular.module('IpsumFE').factory('setInitSrv', function ( $http, $q, API_SECURED_URL, authtoken) {


            // Public API here
            var setInit = {
                getEmail: function () {
                    var deferred = $q.defer(),
                        httpPromise = $http.get(API_SECURED_URL + 'readtoken');
                            httpPromise.then(function (response) {
                                console.log(response.data.message);
                                deferred.resolve(response);
                            }, function (error) {
                                console.error(error);
                                authtoken.removeToken();
                            });
                            return deferred.promise;
                        }
            };

            return setInit;

});