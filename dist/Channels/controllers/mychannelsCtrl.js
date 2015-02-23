'use strict';

angular.module('IpsumFE.Channels').controller('mychannelsCtrl', function ($scope, $rootScope, alert, $timeout, mychannelsSrv, initSet) {

    $scope.NewChannelFormValid = false;
    $scope.FormVisible = "false";
    $scope.FormSelectType = false;
    $scope.FormSelectActive = true;
    $scope.rowtoremove = -1;
    $scope.repeatedname = true;
    $scope.isupdating = false;
    $scope.channels = [];
    $scope.channelsShadow = [];

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

    mychannelsSrv.getAll($rootScope.email, 'mychannels').
    then(function (response) {
        var k = 0;
        $scope.channels = [];
        for (k = 0; k < response.data.totalSize; k++) {
            $scope.channels.push({
                "Active": response.data.channels[k].Active,
                "Description": response.data.channels[k].Description,
                "Id": response.data.channels[k].Id,
                "Name": response.data.channels[k].Name,
                "Premium": response.data.channels[k].Premium,
                "Visible": response.data.channels[k].Visible,
                "Contents": 0,
                "isDeleted": false,
                "idnum": k,
                "flag": 0
            });
        

        }
        $scope.channelsShadow = angular.copy($scope.channels);
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
        var k;
        for (k = 0; k < $scope.channels.length; k++) {
            if (maxvalue < $scope.channels[k].idnum) maxvalue = $scope.channels[k].idnum;
            console.log("--->" + $scope.channels[k].idnum + " " + $scope.channels[k].Name);
        }

        $scope.newchannel.id = maxvalue + 1;
        $scope.newchannel.Contents = 0;
        
        $scope.channelsShadow.push(
            {
                "Visible":$scope.newchannel.Visible,
                "Active":$scope.newchannel.Active,
                "Premium":$scope.newchannel.Premium,
                "Id":$scope.newchannel.id,
                "Name":$scope.newchannel.Name,
                "Description":$scope.newchannel.Description,
                "flag":1,
                "idnum": $scope.newchannel.id
            }
        );
        
        $scope.UpdateChannels( maxvalue + 1, 1);
    
    }

    $scope.deleteChannel = function (rownum) {
        var k;
        for (k = 0; k < $scope.channels.length; k++) {
            if ($scope.channels[k].idnum == rownum) {
                $scope.confirmName = $scope.channels[k].Name;
                $scope.confirmDescription = $scope.channels[k].Description;
                $scope.idtoremove = rownum;
            }
        }

    }

    $scope.UpdateChannels = function (rownum, flag) {
        var k = 0;
        var channel;
        for (channel in $scope.channelsShadow) {
            if (rownum == $scope.channelsShadow[k].idnum) {
                $scope.channelsShadow[k].flag = flag;
                if (flag==2) $scope.channels[k].isDeleted = true;
                $scope.rowtoremove = k;
                $scope.isupdating = true;
                if (flag==3)$scope.channelsShadow[k].Visible=  $scope.channels[k].Visible;
                mychannelsSrv.sync({"email":$rootScope.email, "channels":$scope.channelsShadow}, 'mychannels').
                then(function (response) {
                    mychannelsSrv.getAll($rootScope.email, 'mychannels').
                    then(function (res) {
                        var k = 0;
                        $scope.channelsShadow = [];
                        for (k = 0; k < res.data.totalSize; k++) {
                            $scope.channelsShadow.push({
                                "Active": res.data.channels[k].Active,
                                "Description": res.data.channels[k].Description,
                                "Id": res.data.channels[k].Id,
                                "Name": res.data.channels[k].Name,
                                "Premium": res.data.channels[k].Premium,
                                "Visible": res.data.channels[k].Visible,
                                "Contents": 0,
                                "isDeleted": false,
                                "idnum": k,
                                "flag": 0
                            });
                        }
                        $scope.channels=angular.copy($scope.channelsShadow);
                        $scope.rowtoremove = -1;
                        $scope.isupdating = false;
                    }, function (error) {
                        alert('error', 'Synchronizing channels', ' not possible to read channels ');
                        console.error(error);
                    });
                }, function (error) {
                    alert('error', 'Deleting channel', ' not possible to delete selected channel ');
                    console.error(error);
                });
            }
            k++;
        }
    }

    $scope.changeActive = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channelsShadow) {
            if (rownum == $scope.channelsShadow[k].idnum) {
                if ($scope.channelsShadow[k].Active)
                    $scope.channelsShadow[k].Active = false;
                else
                    $scope.channelsShadow[k].Active = true;
                
                $scope.UpdateChannels(k,3);
            }
            k++;
        }
   }

    $scope.ChannelExists = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].idnum) {
                return true;
            }
            k++;
        }
        return false;
    }

    $scope.$watch('channels', function (newVal, oldVal) {
        console.log("Something changed in channels #########################");
        if (newVal != undefined && oldVal != undefined ) {
            if (newVal.length != oldVal.length) {
                console.log("And it was the array length");
            }else{
               
                
            }
        }
    }, true);

});