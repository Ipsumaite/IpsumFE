'use strict';

angular.module('IpsumFE.Contents').controller('publishCtrl', function ($scope, $rootScope, $window, $timeout, alert, contentsSrv, $firebase, $interval) {


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
        // console.log("Publishing :" + $scope.Content);

        if (undefined != $scope.Content) {
            var postsRef = fbRef.child($scope.selectedChannel);
            var selectChannelName;
            var k;
            for (k = 0; k < $scope.channels.length; k++) {
                if ($scope.channels[k].Id == $scope.selectedChannel)
                    selectChannelName = $scope.channels[k].Name;
            }

            postsRef.push({
                content: $scope.Content,
                latitude: $scope.markerlist.msgMarker.lat.toFixed(4),
                longitude: $scope.markerlist.msgMarker.lng.toFixed(4),
                date: Firebase.ServerValue.TIMESTAMP,
                chName: selectChannelName
            });
        }
        $scope.Content = undefined;
    }


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
                    //console.log("User ID " + $scope.userid);
                    contentsSrv.getAll('', 'contentURL').
                    then(function (responseCh) {
                            fbURL = responseCh.data.url;
                            fbRef = new Firebase("https://" + fbURL + "/channels/" + $scope.userid);

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

    var stop;
    var channelID;



    function Refresh() {
        if (angular.isDefined(stop)) return;
        stop = $interval(function () {
            if (fbRef != undefined) {
                var mychannelstmp = [];
                fbRef.on("child_added", function (snapshotContent) {
                    $timeout(function () {
                        var json = snapshotContent.val();
                        for (var key in json) {
                            // console.log('match!', key + " " + json[key]); // do stuff here!
                            mychannelstmp.push({
                                "key": key,
                                "payload": json[key]
                            });
                        }
                        $scope.mychannels = angular.copy(mychannelstmp);
                    });
                });

            }
        }, 2000);
    };

    $scope.$on('$destroy', function () {
        $interval.cancel(stop);
    });

    Refresh();

});