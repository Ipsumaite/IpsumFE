'use strict';


  angular.module('IpsumFE.Auth').controller('loginCtrl', function ($scope, authtoken,$rootScope,$state, alert, initSet, $http, API_URL) {

    $scope.email="";
    $scope.password="";
    $scope.formValidated=false;
      
    $scope.Authenticate = function(){

        var user ={
            email: $scope.email,
            password: $scope.password
        };
        
        $http.post(API_URL +"login", user)
        .success(function(res){
                alert('success', 'Hi',' welcome back '+ res.firstname + ' ' + res.lastname +  '!');
                authtoken.setToken(res.token);
                initSet.authenticated = true;
                initSet.email = res.email;
                initSet.firstname = res.firstname;
                initSet.lastname = res.lastname;
                initSet.timestamp = new Date();
                $state.go('mychannels');
                
        })
        .error(function(data, status, headers, config){
            alert('warning', 'Opps!', data);
        });
        
     };
        
        

    
      
    $scope.$watch('password', function(newval) {
        // do something here
        if (newval!= undefined){
            if (newval.length > 7 && $scope.email.length>2){
                $scope.formValidated=true;
            }else{
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
