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

    mychannelsSrv.getAll($rootScope.email).
    then(function (response) {
        var k = 0;
        $scope.channels = [];
        for (k = 0; k < response.data.totalSize; k++) {
            $scope.channels.push({
                "Active": response.data.records[k].Active__c,
                "Description": response.data.records[k].description__c,
                "Id": response.data.records[k].Id,
                "Name": response.data.records[k].Name,
                "Premium": response.data.records[k].Premium__c,
                "Visible": response.data.records[k].Visible__c,
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
            }
        );
        
        mychannelsSrv.sync({"email":$rootScope.email, "channels":$scope.channelsShadow} ).
        then(function (response) {
             mychannelsSrv.getAll($rootScope.email).
                then(function (res) {
                    var k = 0;
                    $scope.channelsShadow = [];
                    for (k = 0; k < res.data.totalSize; k++) {
                        $scope.channelsShadow.push({
                            "Active": res.data.records[k].Active__c,
                            "Description": res.data.records[k].description__c,
                            "Id": res.data.records[k].Id,
                            "Name": res.data.records[k].Name,
                            "Premium": res.data.records[k].Premium__c,
                            "Visible": res.data.records[k].Visible__c,
                            "Contents": 0,
                            "isDeleted": false,
                            "idnum": k,
                            "flag": 0
                        });
                    }
                    $scope.channels=angular.copy($scope.channelsShadow);
                }, function (error) {
                    alert('error', 'Synchronizing channels', ' not possible to read channels ');
                    console.error(error);
                });
        }, function (error) {
            alert('error', 'Saving channels', ' not possible to save recent created channels ');
            console.error(error);
        });
        
        
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

    $scope.confirmdeleteChannel = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].idnum) {
                $scope.channels[k].isDeleted = true;
                $scope.channelsShadow[k].flag = 2;
                $scope.rowtoremove = k;
                $scope.isremoving = true;
                
                mychannelsSrv.sync({"email":$rootScope.email, "channels":$scope.channelsShadow} ).
                then(function (response) {
                    mychannelsSrv.getAll($rootScope.email).
                    then(function (res) {
                        var k = 0;
                        $scope.channelsShadow = [];
                        for (k = 0; k < res.data.totalSize; k++) {
                            $scope.channelsShadow.push({
                                "Active": res.data.records[k].Active__c,
                                "Description": res.data.records[k].description__c,
                                "Id": res.data.records[k].Id,
                                "Name": res.data.records[k].Name,
                                "Premium": res.data.records[k].Premium__c,
                                "Visible": res.data.records[k].Visible__c,
                                "Contents": 0,
                                "isDeleted": false,
                                "idnum": k,
                                "flag": 0
                            });
                        }
                        $scope.channels=angular.copy($scope.channelsShadow);
                        $scope.rowtoremove = -1;
                        $scope.isremoving = false;
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
    
    //$scope.ChangeVisible

    $scope.changeActive = function (rownum) {
        var k = 0;
        var channel;
        for (channel in $scope.channels) {
            if (rownum == $scope.channels[k].idnum) {
                if ($scope.channels[k].Active)
                    $scope.channels[k].Active = false;
                else
                    $scope.channels[k].Active = true;
                
            }
            $scope.channels[k].flag=3;
            k++;
        }
        
        
                mychannelsSrv.sync({"email":$rootScope.email, "channels":$scope.channels} ).
                 then(function (response) {
                    mychannelsSrv.getAll($rootScope.email).
                    then(function (res) {
                        var k = 0;
                        $scope.channelsShadow = [];
                        for (k = 0; k < res.data.totalSize; k++) {
                            $scope.channelsShadow.push({
                                "Active": res.data.records[k].Active__c,
                                "Description": res.data.records[k].description__c,
                                "Id": res.data.records[k].Id,
                                "Name": res.data.records[k].Name,
                                "Premium": res.data.records[k].Premium__c,
                                "Visible": res.data.records[k].Visible__c,
                                "Contents": 0,
                                "isDeleted": false,
                                "idnum": k,
                                "flag": 0
                            });
                        }
                    }, function (error) {
                        alert('error', 'Synchronizing channels', ' not possible to update channels ');
                        console.error(error);
                    });
                }, function (error) {
                    alert('error', 'Updating channel', ' not possible to update selected channel ');
                    console.error(error);
                });
        
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
            var k;
            for (k = 0; k < newVal.length; k++) {
                console.log("Id: " + newVal[k].idnum + " , " + newVal[k].Name);
            }
        }
    }, true);

});