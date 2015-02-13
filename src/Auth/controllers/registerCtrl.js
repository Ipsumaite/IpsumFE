'use strict';


  angular.module('IpsumFE.Auth').controller('registerCtrl', function ($scope, authtoken, alert) {

    $scope.stage1=false;
    $scope.email="";
    $scope.password="";
    $scope.password_confirm="";
    $scope.formValidated=false;
    $scope.firstname="";
    $scope.lastname="";
    $scope.phone="";
    $scope.address="";
    $scope.passwordOK=false;
  

    $scope.next = function(){
        $scope.stage1=true;
    };
      
    $scope.previous = function(){
        $scope.stage1=false;
    };

    $scope.register = function(){
        console.log("Registering");
    };
    
    $scope.checkPass = function(){
        console.log("Checking Password");
    };
    
    $scope.$watch('password', function(newval) {
        // do something here
        if (newval!= undefined){
            if (newval.length > 7 && $scope.email.length>2 && newval == $scope.password_confirm){
                $scope.formValidated=true;
            }else{
                $scope.formValidated=false;
            }
        }
    });
    $scope.$watch('password_confirm', function(newval) {
        // do something here
        if (newval!= undefined){
            if (newval == $scope.password){
                $scope.passwordOK=true;
                if ($scope.email.length > 2 && $scope.password.length>7) $scope.formValidated=true;
            }else{
                $scope.passwordOK=false;
                 $scope.formValidated=false;
            }
        }
    });
    
    $scope.$watch('email', function(newval) {
        // do something here
        if (newval!= undefined){
            if (newval.length > 2 && $scope.password.length>7){
                $scope.formValidated=true;
            }else{
                $scope.formValidated=false;
            }
        }
    });  
      
  });
