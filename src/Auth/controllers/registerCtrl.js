'use strict';


  angular.module('IpsumFE.Auth').controller('registerCtrl', function ($scope, authtoken, alert, initSet, $state, $http, API_URL) {

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
        
          var struser= "{\"firstname\":\""+ $scope.firstname +"\", \"lastname\":\"" + $scope.lastname + "\", \"phone\":\"" + $scope.phone + "\", \"address\":\""+$scope.address+"\"}";
        
          var user ={
            email: $scope.email,
            password: $scope.password,
            user: struser
          };
        
        $http.post(API_URL +"signup", user)
        .success(function(res){
                alert('success', 'Hi',' welcome ' + res.firstname + ' ' + res.lastname + '!');
                authtoken.setToken(res.token);
                initSet.authenticated = true;
                initSet.email = res.email;
                initSet.firstname = res.firstname;
                initSet.lastname = res.lastname;
                initSet.timestamp = new Date();
                $state.go('home');
                
        })
        .error(function(data, status, headers, config){
            alert('warning', 'Opps!', data);
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
