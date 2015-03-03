'use strict';


angular.module('IpsumFE.Auth').controller('loginCtrl', function ($scope, authtoken, $rootScope, $state, alert, initSet, authSrv) {

    $scope.email = "";
    $scope.password = "";
    $scope.formValidated = false;

    $scope.Authenticate = function () {

        var user = {
            email: $scope.email,
            password: $scope.password
        };
        alert('info', 'Trying to signin', ' just wait a few moments please. ');

        authSrv.signing(user, 'login').
        then(function (response) {
            alert('success', 'Hi', ' welcome back ' + response.data.firstname + ' ' + response.data.lastname + '!');
            authtoken.setToken(response.data.token);
            initSet.authenticated = true;
            initSet.email = response.data.email;
            initSet.firstname = response.data.firstname;
            initSet.lastname = response.data.lastname;
            initSet.timestamp = new Date();
            $rootScope.email = response.data.email;

            var presenceForm = {
                email: initSet.email,
                latitude: initSet.latitude,
                longitude: initSet.longitude,
            }
            authSrv.presence(presenceForm).
            then(function (response) {
                $state.go('mychannels');
            }, function (error) {
                alert('warning', 'Signaling Presence to Ipsum', error.data);
            });

        }, function (error) {
            alert('warning', 'Opps!', error.data);
            authtoken.removeToken();
        });

    };

    navigator.geolocation.watchPosition(showPosition, undefined, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.$apply(function () {
            initSet.latitude = lat;
            initSet.longitude = lng;
        });
    }

    $scope.$watch('password', function (newval) {
        // do something here
        if (newval != undefined) {
            if (newval.length > 7 && $scope.email.length > 2) {
                $scope.formValidated = true;
            } else {
                $scope.formValidated = false;
            }
        }
    });

    $scope.$watch('email', function (newval) {
        // do something here
        if (newval != undefined) {
            if (newval.length > 2 && $scope.password.length > 7) {
                $scope.formValidated = true;
            } else {
                $scope.formValidated = false;
            }
        }
    });


});