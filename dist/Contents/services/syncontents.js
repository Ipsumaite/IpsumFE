IpsumApp.service('newMessage', function($q, $http) {

    console.log("Writing a New message");
  
    return({
        addMessage: addMessage
    });
     
    
     function addMessage( marker, msgmarker ) {
 
    
        var request = $http({
            method: "post",
            url: "/sendmsg",
             data:{
                src: msgmarker.sender,
                dst: msgmarker.receiver,
                body: msgmarker.body,
                subject: marker.message,
                lat: marker.lat,
                long: marker.lng
            }
        });

        return( request.then( handleSuccess, handleError ) );
 
     }
    
    
     function handleError( response ) {
        if (
        ! angular.isObject( response.data ) ||
        ! response.data.message
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }

        return( $q.reject( response.data.message ) );
     }


     function handleSuccess( response ) { return( response.data );  }

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
      