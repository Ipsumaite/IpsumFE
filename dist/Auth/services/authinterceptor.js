'use strict';


angular.module('IpsumFE.Auth').factory('authInterceptor', function (authtoken) {

    // Public API here
    return {
        request: function(config) {
            var token = authtoken.getToken();
            if (token)
                config.headers.Authorization = 'Bearer ' + token;
            return config; 
        },
        response: function(response) {
            return response;
        }
        
    };
});
