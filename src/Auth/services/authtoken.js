'use strict';

angular.module('IpsumFE.Auth').factory('authtoken', function ($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var userToken;
    var dateToken;
    
    // Public API here
    var authtoken =  {
      setToken: function (token) {
        cachedToken=token;
        storage.setItem(userToken, token);
        storage.setItem(dateToken, new Date().toISOString());
      },
      getToken: function(){
         if (!cachedToken)
             cachedToken = storage.getItem(userToken);
         return cachedToken;
      },
      getTokenDate: function(){
         return storage.getItem(dateToken);
      },
      isAuthenticated: function(){
        return !!authtoken.getToken();           
      },
      removeToken: function(){
        cachedToken = null;
        storage.removeItem(userToken);
        storage.removeItem(dateToken);
      }
    };
    
    return authtoken;
    
  });
