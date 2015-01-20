'use strict';


  angular.module('IpsumFE.Auth').controller('logoutCtrl', function ($scope, authtoken,$rootScope,$state, alert) {
  
      $rootScope.authenticated=false;
      authtoken.setData(false);
      authtoken.removeData();
      alert('default', 'Good bye!', 'See you later user 1');
      $state.go('home');
     
  });
