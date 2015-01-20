'use strict';


  angular.module('IpsumFE').controller('headerCtrl', function ($scope, authtoken, $rootScope) {

      $scope.isAuthenticated= authtoken.getData;
  });
