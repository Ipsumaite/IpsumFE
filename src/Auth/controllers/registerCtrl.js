'use strict';


  angular.module('IpsumFE.Auth').controller('registerCtrl', function ($scope, authtoken,$rootScope,$state, alert) {

    $scope.stage1=false;
      
    $scope.next = function(){
        $scope.stage1=true;
    };
      
    $scope.previous = function(){
        $scope.stage1=false;
    };

  });
