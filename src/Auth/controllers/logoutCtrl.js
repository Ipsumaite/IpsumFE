'use strict';


  angular.module('IpsumFE.Auth').controller('logoutCtrl', function ($scope, authtoken,$rootScope,$state, alert, initSet) {
  
      authtoken.removeToken();
      alert('default', 'Good bye!', 'See you later '+ initSet.email);
      $state.go('home');
     
  });
