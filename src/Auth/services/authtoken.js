'use strict';

angular.module('IpsumFE.Auth').factory('authtoken', function($window, $rootScope){
 var valtmp=false;

    
 angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
      this.valtmp = getData();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
       
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    },
    removeData: function() {
      $window.localStorage && $window.localStorage.removeItem('my-storage');
       
      return this;
    }
  };
    
});
    