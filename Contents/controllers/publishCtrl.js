'use strict';

angular.module('IpsumFE.Contents').controller('publishCtrl', function ($scope, $rootScope, $window, $timeout, alert, contentsSrv, $firebase) {


    $scope.channels = [];
    $scope.selectedChannel = {}



    var fbRef, fbURL, mychannels, ref;

    $scope.center = {
        lat: 40.095,
        lng: -3.823,
        zoom: 4
    }

    alert('info', 'Loading your channels and position', ' just wait a few moments please. ');

    $scope.markerlist = {
        msgMarker: {
            lat: 39.00001,
            lng: -5.00001,
            focus: false,
            draggable: true
        }
    };

    navigator.geolocation.watchPosition(showPosition, undefined, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });


    $scope.Publish = function () {
        console.log("Publishing :" + $scope.Content);

        if (undefined != $scope.Content) {
            var postsRef = fbRef.child($scope.selectedChannel);
            postsRef.push({
                content: $scope.Content,
                latitude: $scope.markerlist.msgMarker.lat.toFixed(4),
                longitude: $scope.markerlist.msgMarker.lng.toFixed(4),
                date: Firebase.ServerValue.TIMESTAMP
            });
        }
        $scope.Content = undefined;
      
    
            
        
    }


  ref = new $window.Firebase("https://glowing-heat-3433.firebaseio.com/channels/");
            // Retrieve new contents as they are added to Firebase
        ref.on("child_added", function(snapshotUser) {
          // Retrieve new contents as they are added to Firebase
            ref.child(snapshotUser.key()).on("child_added", function(snapshotChannel) {
                var newChannel = snapshotChannel.val();
                console.log("User "+ snapshotUser.key() +": Channel " + snapshotChannel.key());
                ref.child(snapshotUser.key()+"/"+ snapshotChannel.key()).on("child_added", function(snapshotContent) {
                   var newContent = snapshotContent.val();
                  //console.log("User "+ snapshotUser.key() +": Channel " + snapshotChannel.key() + ": Content "+ newContent.content + " :Key " + snapshotContent.key() );

                    $timeout(function() {
                        var newUser = snapshotUser.val();
                        console.log("Content -->"  + " " + newContent.content);
                    });

                    
                });  
            });

           
        });
    


    contentsSrv.getAll($rootScope.email, 'mychannels').
    then(function (response) {
            var k = 0;
            $scope.channelsShadow = [];
            for (k = 0; k < response.data.totalSize; k++) {
                $scope.channelsShadow.push({
                    "Id": response.data.channels[k].Id,
                    "Name": response.data.channels[k].Name
                });
                if (k == 0) $scope.selectedChannel = response.data.channels[k].Id;
            }
            $scope.channels = angular.copy($scope.channelsShadow);

            contentsSrv.getAll($rootScope.email, 'accountID').
            then(function (response) {
                    $scope.userid = response.data.Id;
                    console.log("User ID " + $scope.userid);
                    contentsSrv.getAll('', 'contentURL').
                    then(function (responseCh) {
                            fbURL = responseCh.data.url;
                            console.log("--->" + fbURL);
                            fbRef = new Firebase("https://" + fbURL + "/channels/" + $scope.userid);
                            mychannels = $firebase(fbRef);
                        },
                        function (error) {
                            alert('error', 'Loading channels', ' not possible to read channels ');
                            console.error(error);
                        });
                },
                function (error) {
                    alert('error', 'Reading User Id', ' not possible to user Identification');
                    console.error(error);
                });

        },
        function (error) {
            alert('error', 'Loading channels', ' not possible to read channels ');
            console.error(error);
        });


    $scope.$watch('markerlist', function (newVal, oldVal) {
        //console.log(" Lat " + newVal.msgMarker.lat + ", " +newVal.msgMarker.lat.toFixed(4));

    }, true);



    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $scope.$apply(function () {
            $scope.markerlist.msgMarker.lat = lat;
            $scope.markerlist.msgMarker.lng = lng;

            $scope.center.lat = lat;
            $scope.center.lng = lng;
            $scope.center.zoom = 18;

        });
    }



});