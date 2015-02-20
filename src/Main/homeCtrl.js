'use strict';


angular.module('IpsumFE').controller('homeCtrl', function ($scope, authtoken, $rootScope, initSet, setInitSrv) {

    setInitSrv.getEmail().
    then(function (response) {
        console.log("Status "+ response.status);
        if (response.data.email == undefined){
             authtoken.removeToken();
        }else{
            $rootScope.email = response.data.email;
            console.log("Checked Email "+ response.data.email);
            
        }
      
    }, function (error) {
        alert('error', ' Checking Token', ' Please try to authenticate ');
        authtoken.removeToken();
        console.error(error);
    });

    


});