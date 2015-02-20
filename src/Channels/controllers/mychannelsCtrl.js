'use strict';

angular.module('IpsumFE.Channels').controller('mychannelsCtrl', function ($scope, $rootScope, alert, $timeout, mychannelsSrv, initSet) {

    $scope.NewChannelFormValid = false;
    $scope.FormVisible = "false";
    $scope.FormSelectType = false;
    $scope.FormSelectActive = true;
    $scope.rowtoremove = -1;
    $scope.repeatedname = true;
    $scope.isremoving = false;
    $scope.channels = [];

    alert('info', 'Loading your channels', ' just wait a few moments please. ');

    $scope.FormchannelActive = [
        {
            "value": false,
            "label": "Disabled"
            },
        {
            "value": true,
            "label": "Active"
            }
        ];

    $scope.FormchannelType = [
        {
            "type": false,
            "desctype": "Free"
            },
        {
            "type": true,
            "desctype": "Premium"
            }
        ];

    $scope.initNewChannel = function () {
        return {
            "Name": "",
            "CreatedAt": new Date().toDateString(),
            "Description": "",
            "Detail": "",
            "Premium": false,
            "Contents": 0,
            "Visible": false,
            "Active": true
        };
    }

    $scope.resetChannelForm = function () {
        $scope.NewChannelFormValid = false;
        $scope.newchannel.Name = "";
        $scope.newchannel.Description = "";
        $scope.FormVisible = "false";
        $scope.FormSelectType = false;
        $scope.FormSelectActive = true;
    }

    $scope.newchannel = $scope.initNewChannel();
    $scope.resetChannelForm();

    mychannelsSrv.getAll($rootScope.email).
    then(function (response) {
        var k = 0;
        $scope.channels = [];
        for (k = 0; k < response.data.totalSize; k++) {
            $scope.channels.push({
                "Active": response.data.records[k].Active__c,
                "Description": response.data.records[k].description__c,
                "id": response.data.records[k].Id,
                "Name": response.data.records[k].Name,
                "Premium": response.data.records[k].Premium__c,
                "Visible": response.data.records[k].Visible__c,
                "Contents": 0,
                "isDeleted": false
            });

        }
    }, function (error) {
        alert('error', 'Loading channels', ' not possible to read channels ');
        console.error(error);
    });

    $scope.$watch('[newchannel.Name,newchannel.Description]', function () {
        if ($scope.newchannel.Name != undefined && $scope.newchannel.Description != undefined) {
            if ($scope.newchannel.Name.length > 4 && $scope.newchannel.Description.length > 10)
                $scope.NewChannelFormValid = true;

            else
                $scope.NewChannelFormValid = false;
        }

        if ($scope.newchannel.Name != undefined && $scope.channels != undefined) {
            var k;
            $scope.repeatedname = false;
            for (k = 0; k < $scope.channels.length; k++) {
                if ($scope.newchannel.Name == $scope.channels[k].Name) {
                    $scope.repeatedname = true;
                    $scope.NewChannelFormValid = false;
                }
            }
        }

    });

    $scope.cancelChannel = function () {
        $scope.NewChannelFormValid = false;
        $scope.newchannel = $scope.initNewChannel();
    }

    $scope.launchChannel = function () {
        $scope.newchannel.Visible = ($scope.FormVisible == "true") ? true : false;
        $scope.newchannel.Premium = $scope.FormSelectType;
        $scope.newchannel.Active = $scope.FormSelectActive;
        var maxvalue = 0;
        var channel;
        for (channel in $scope.channels) {
            if (maxvalue < channel.id) maxvalue = channel.id;
            console.log("--->" + channel.id);
        }

        var k;
        for (k = 0; k < $scope.channels.length; k++) {
            if (maxvalue < $scope.channels[k].id) maxvalue = $scope.channels[k].id;
        }

        $scope.newchannel.id = maxvalue + 1;
        $scope.newchannel.Contents = 0;
        $scope.channels.push(angular.copy($scope.newchannel));
    }

    $scope.deleteChannel = function (rownum) {
        var k;
        for (k = 0; k < $scope.channels.length; k++) {
            if ($scope.channels[k].id == rownum) {
                $scope.confirmName = $scope.channels[k].Name;
                $scope.confirmDescription = $scope.channels[k].Description;
                $scope.idtoremove = rownum;
            }
        }

    }

    $scope.confirmdeleteChannel = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].id) {
                $scope.channels[k].isDeleted = true;
                $scope.rowtoremove = k;
                $scope.isremoving = true;
                $timeout(function (k) {
                    $scope.channels.splice($scope.rowtoremove, 1);
                    $scope.rowtoremove = -1;
                    $scope.isremoving = false;
                }, 2000);
            }
            k++;
        }
    }

    $scope.changeActive = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].id) {
                if ($scope.channels[k].Active)
                    $scope.channels[k].Active = false;
                else
                    $scope.channels[k].Active = true;
            }
            k++;
        }
    }

    $scope.ChannelExists = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].id) {
                return true;
            }
            k++;
        }
        return false;
    }

    $scope.$watch('channels', function (newVal, oldVal) {
        console.log("Something changed in channels #########################");
        if (newVal != undefined && oldVal != undefined) {
            if (newVal.length != oldVal.length) {
                console.log("And it was the array length");
            }
            var k;
            for (k = 0; k < newVal.length; k++) {
                console.log("Id: " + newVal[k].id + " , " + newVal[k].Name);
            }
        }
    }, true);

});