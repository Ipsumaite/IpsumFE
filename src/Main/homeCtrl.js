'use strict';


angular.module('IpsumFE').controller('homeCtrl', function ($scope, authtoken, $rootScope, initSet, authSrv) {

    //console.log("Existing token " + authtoken.getToken());
    
    if (authtoken.getToken()){
        authSrv.getEmail().
        then(function (response) {
            console.log("Status "+ response.status);
            if (response.data.email == undefined || !response.data.email){
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
    }

    

  

    

});