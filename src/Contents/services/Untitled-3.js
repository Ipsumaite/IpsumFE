IpsumApp.service('lastsndmsgData', function($q, $http) {

    console.log("Resource Read");
   return {
      getMessage: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/lastsndmsgv2');
 
        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
      }
    };
        
});
     

  var stop;
        $scope.Refresh = function() {
          if ( angular.isDefined(stop) ) return;
          stop = $interval(function() { 
              $scope.tmpvar = $scope.tmpvar + 1  
              lastsndmsgData.getMessage()
                .then(function (response) {
                  $scope.messages = response.data.msg;
                  
                    }, function (error) {
                        console.error(error);
                    });
          
          
          }, 5000);
        };