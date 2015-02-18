'use strict';  

angular.module('IpsumFE.Channels').controller('subscriptionsCtrl', function ($scope) {
      $scope.subscribed =[
                   {
                "Name": "Ultrices Vivamus Ltd",
                "CreatedAt": "22/10/2014",
                "Description": "commodo",
                "Detail": "ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit,",
                "Type": "Free",
                "code": "EHH13FNV7QQ"
            },
            {
                "Name": "Libero Donec Inc.",
                "CreatedAt": "21/08/2015",
                "Description": "tellus. Nunc lectus pede,",
                "Detail": "mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede.",
                "Type": "Premium",
                "code": "EAY91ZIV3GO"
            },
            {
                "Name": "Pulvinar Arcu LLC",
                "CreatedAt": "22/12/2015",
                "Description": "faucibus leo, in",
                "Detail": "mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis dis",
                "Type": "Free",
                "code": "FXD77BFI4HI"
            },
            {
                "Name": "Magnis LLP",
                "CreatedAt": "02/10/2014",
                "Description": "purus ac",
                "Detail": "lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class",
                "Type": "Premium",
                "code": "JQU38TUZ1SK"
            },
            {
                "Name": "Tempor Erat LLP",
                "CreatedAt": "16/06/2015",
                "Description": "gravida sit amet, dapibus",
                "Detail": "arcu. Sed eu nibh vulputate mauris sagittis placerat. Cras dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc",
                "Type": "Free",
                "code": "RVA71ADF1IJ"
            }
     ];
    

     $scope.available = [
             {
            "Name": "Egestas LLP",
            "CreatedAt": "04/07/2014",
            "Description": "ac, feugiat",
            "Detail": "ut, pharetra sed, hendrerit a, arcu. Sed et libero.",
            "Type": "Free",
            "code": "SRQ21TRM7QJ"
        },
        {
            "Name": "Enim Foundation",
            "CreatedAt": "01/01/2016",
            "Description": "cursus et, eros.",
            "Detail": "fermentum metus. Aenean sed pede nec ante blandit viverra. Donec tempus, lorem",
            "Type": "Premium",
            "code": "LYG93GFC6MI"
        },
        {
            "Name": "Consequat Dolor Vitae Company",
            "CreatedAt": "15/06/2015",
            "Description": "Integer aliquam",
            "Detail": "leo. Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor sit amet,",
            "Type": "Premium",
            "code": "HRS29QEY9TI"
        },
        {
            "Name": "Penatibus Et Magnis Limited",
            "CreatedAt": "28/02/2014",
            "Description": "augue porttitor interdum. Sed",
            "Detail": "massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac",
            "Type": "Free",
            "code": "QJT06BWV5DQ"
        },
        {
            "Name": "Risus Morbi Foundation",
            "CreatedAt": "26/11/2014",
            "Description": "Suspendisse eleifend.",
            "Detail": "ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum.",
            "Type": "Free",
            "code": "BIS18JZK8AL"
        }
     ];
    
   });
