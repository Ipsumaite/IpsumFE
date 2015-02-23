'use strict';


  angular.module('IpsumFE.Auth').controller('registerCtrl', function ($scope, authtoken, alert, initSet, $state, authSrv) {

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

    $scope.signup = function(){
        
          var usrinfo= {
              "firstname": $scope.firstname,
              "lastname": $scope.lastname,
              "phone": $scope.phone,
              "address": $scope.address
              };
        
          var user ={
            email: $scope.email,
            password: $scope.password,
            user: usrinfo
          };
        
        alert('info', 'Trying to signup',' just wait a few moments please. ');
        
        authSrv.signing(user, 'singup').
        then(function (response) {
                alert('success', 'Hi',' welcome ' + response.data.firstname + ' ' + response.data.lastname + '!');
                authtoken.setToken(response.data.token);
                initSet.authenticated = true;
                initSet.email = response.data.email;
                initSet.firstname = response.data.firstname;
                initSet.lastname = response.data.lastname;
                initSet.timestamp = new Date();
                $rootScope.email = response.data.email;
                $state.go('mychannels');
        }, function (error) {
            alert('warning', 'Opps!', error.data);
            authtoken.removeToken();
        });
    

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
