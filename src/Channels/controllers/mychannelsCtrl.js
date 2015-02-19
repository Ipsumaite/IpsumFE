'use strict';

angular.module('IpsumFE.Channels').controller('mychannelsCtrl', function ($scope,alert, $timeout, mychannelsSrv, initSet) {

    $scope.NewChannelFormValid = false;
    $scope.FormVisible = "false";
    $scope.FormSelectType = false;
    $scope.FormSelectActive = true;
    $scope.rowtoremove = -1;
    $scope.repeatedname = true;
    $scope.isremoving = false;
    
    alert('info', 'Loading your channels',' just wait a few moments please. ');
    
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
            $scope.newchannel.Name="";
            $scope.newchannel.Description="";
            $scope.FormVisible = "false";
            $scope.FormSelectType = false;
            $scope.FormSelectActive = true;
    }

    $scope.newchannel = $scope.initNewChannel();
    $scope.resetChannelForm();

    var loadChannels=function(){
    
        $scope.channels = [
            {
                "Name": "Class Aptent Taciti Associates",
                "CreatedAt": "04/09/2014",
                "Description": "ac tellus. Suspendisse sed dolor.",
                "Detail": "nulla at sem molestie sodales. Mauris blandit enim consequat purus. Maecenas libero est, congue a, aliquet",
                "Premium": false,
                "Active": true,
                "Visible": true,
                "Contents": 34,
                "id": 1,
                "isDeleted": false
                },
            {
                "Name": "Eu Foundation",
                "CreatedAt": "10/06/2014",
                "Description": "et magnis dis",
                "Detail": "cursus in,",
                "Premium": true,
                "Active": true,
                "Visible": true,
                "Contents": 4,
                "id": 2,
                "isDeleted": false
                },
            {
                "Name": "Porttitor PC",
                "CreatedAt": "16/05/2014",
                "Description": "venenatis vel, faucibus",
                "Detail": "amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu",
                "Premium": false,
                "Active": true,
                "Visible": false,
                "Contents": 0,
                "id": 3,
                "isDeleted": false
                },
            {
                "Name": "Molestie In LLP",
                "CreatedAt": "21/05/2015",
                "Description": "Nunc ac sem",
                "Detail": "ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec elementum, lorem",
                "Premium": true,
                "Active": false,
                "Visible": false,
                "Contents": 12,
                "id": 4,
                "isDeleted": false
                },
            {
                "Name": "Semper Limited",
                "CreatedAt": "08/05/2014",
                "Description": "non enim",
                "Detail": "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam",
                "Premium": false,
                "Active": true,
                "Visible": true,
                "Contents": 5,
                "id": 5,
                "isDeleted": false
                }
         ];
    }

    //$timeout(loadChannels, 4000);
     $scope.channels = mychannelsSrv.getAll(initSet.email);
    
    $scope.$watch('[newchannel.Name,newchannel.Description]', function () {
        if ($scope.newchannel.Name != undefined && $scope.newchannel.Description != undefined) {
            if ($scope.newchannel.Name.length > 4 && $scope.newchannel.Description.length > 10)
                $scope.NewChannelFormValid = true;
                
            else
                $scope.NewChannelFormValid = false;
        }
        
        if ($scope.newchannel.Name != undefined && $scope.channels!=undefined ){
                var k;
                $scope.repeatedname = false;
                for (k=0; k<$scope.channels.length; k++) {
                    if ($scope.newchannel.Name == $scope.channels[k].Name ) { 
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
            if (maxvalue < channel.id ) maxvalue = channel.id;
            console.log("--->" + channel.id);
        }
        
        var k;
        for (k=0; k<$scope.channels.length; k++) {
            if (maxvalue < $scope.channels[k].id ) maxvalue = $scope.channels[k].id;
        }
        
        $scope.newchannel.id = maxvalue + 1;
        $scope.newchannel.Contents = 0;
        $scope.channels.push(angular.copy($scope.newchannel));
    }

    $scope.deleteChannel = function(rownum){
        var k;
        for (k=0; k<$scope.channels.length; k++) {
            if ($scope.channels[k].id == rownum){
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
                $scope.channels[k].isDeleted= true;
                $scope.rowtoremove = k;
                $scope.isremoving = true;
                $timeout(function(k){
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
    
    $scope.ChannelExists = function (rownum){
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
        if (newVal != undefined && oldVal != undefined){
            if (newVal.length != oldVal.length) {
                console.log("And it was the array length");
                

            }

            var k;
            for (k=0; k<newVal.length; k++) {
                console.log("Id: "+newVal[k].id + " , " + newVal[k].Name);
            }
        
        }        
    }, true);

});