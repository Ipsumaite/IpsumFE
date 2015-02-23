'use strict';

angular.module('IpsumFE.Channels').controller('subscriptionsCtrl', function ($scope, $rootScope, alert, mychannelsSrv) {

    $scope.channels = [];
    $scope.channelsShadow = [];
    $scope.isupdating = false;
    alert('info', 'Loading channels and your subscriptions', ' just wait a few moments please. ');

    function getChannels() {
        mychannelsSrv.getAll($rootScope.email, 'subscriptions').
        then(function (response) {
            var k = 0;
            $scope.channelsShadow = [];
            for (k = 0; k < response.data.totalSize; k++) {
                var channel = {
                    "Description": response.data.channels[k].Description,
                    "Id": response.data.channels[k].Id,
                    "Name": response.data.channels[k].Name,
                    "Premium": response.data.channels[k].Premium,
                    "Subscribed": response.data.channels[k].Subscribed,
                    "Contents": 0,
                    "idnum": k,
                    "flag": 0,
                    "details": false
                }

                if (true == channel.Subscribed)
                    channel.Subscription = {
                        "Id": response.data.channels[k].Subscription.Id,
                        "ContractTerm": response.data.channels[k].Subscription.ContractTerm,
                        "ContractNumber": response.data.channels[k].Subscription.ContractNumber,
                        "CreatedDate": response.data.channels[k].Subscription.CreatedDate,
                        "Description": response.data.channels[k].Subscription.Description,
                        "EndDate": response.data.channels[k].Subscription.EndDate,
                        "StartDate": response.data.channels[k].Subscription.StartDate
                    };
                $scope.channelsShadow.push(channel);

            }
            $scope.channels = angular.copy($scope.channelsShadow);
        }, function (error) {
            alert('error', 'Loading Subscriptions', ' not possible to read subscriptions ');
            console.error(error);
        });
    }

    getChannels();

    $scope.seeDetails = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].idnum) {
                if ($scope.channels[k].details == false)
                    $scope.channels[k].details = true;
                else
                    $scope.channels[k].details = false;
            }
            k++;
        }
    }


    $scope.changeStatus = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channelsShadow) {
            if (rownum == $scope.channelsShadow[k].idnum) {
                if ($scope.channelsShadow[k].Subscribed) {
                    $scope.channelsShadow[k].Subscribed = false;
                    $scope.UpdateChannels(k, 2);
                } else {
                    $scope.channelsShadow[k].Subscribed = true;
                    $scope.UpdateChannels(k, 1);
                }
            }
            k++;
        }
    }

    $scope.UpdateChannels = function (rownum, flag) {
        var k = 0;
        var channel;
        for (channel in $scope.channelsShadow) {
            if (rownum == $scope.channelsShadow[k].idnum) {
                $scope.channelsShadow[k].flag = flag;
                $scope.rowtoremove = k;
                $scope.isupdating = true;
                var subscriptions = [];

                if (1 == flag)
                    subscriptions.push({
                        "ChannelId": $scope.channelsShadow[k].Id,
                        "ContractTerm": 6,
                        "flag": 1
                    });
                if (2 == flag)
                    subscriptions.push({
                        "Id": $scope.channelsShadow[k].Subscription.Id,
                        "flag": 2
                    });

                mychannelsSrv.sync({ "email": $rootScope.email, "subscriptions": subscriptions }, 'subscriptions').
                    then(function (response) {
                        getChannels();
                        $scope.isupdating = false;
                    }, function (error) {
                        alert('error', 'Synchronizing channels and subscriptions', ' not possible to read channels ');
                        console.error(error);
                    });
           
    }
    k++;
}
}


});