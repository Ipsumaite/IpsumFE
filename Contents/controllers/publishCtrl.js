'use strict';  

angular.module('IpsumFE.Contents').controller('publishCtrl', function ($scope, $window,  $http,$state) {
        $scope.mapheight =function(){
            var height = $window.innerHeight/2;
            if (height > 500) height = 500;
            return height;  
        };
    
    
        $scope.mapwidth =function(){
            var width = $window.innerWidth/2;
            if (width > 500) width = 500;
            if (width < 250) width = 250;
            return width;  
        };
    
        $scope.msg = "Insert your Message";
        $scope.center = {
                            lat: 51.505,
                            lng: -0.09,
                            zoom: 3
                };
    
        $scope.markerlist={
                     msgMarker : {
                        lat: 39.00001,
                        lng: -5.00001,
                        message: "",
                        focus: false,
                        draggable: true
                     }
       };
    
              
       $scope.msglist ={
                     msgextra: {
                         sender: 0,
                         receiver: 0,
                         body: "Message Body"
                     }
       };
    
        $scope.cancelMessage = function(){
                $state.go('home');
        }
        $scope.saveMessage = function(){
             
        };        
});