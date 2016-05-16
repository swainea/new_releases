(function() {
  'use strict';

  angular
    .module('app')
    .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http', '$q'];

  function SpotifyService ($http, $q){

    return {
      getNewReleases: getNewReleases
    };

    function getNewReleases ( access_token ){
      // console.log("access_token: ", access_token);
      // access_token = 0;
      if (typeof access_token === 'string'){

        return $http ({
          method: 'GET',
          url: 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50',
          headers: {
             'Authorization': 'Bearer ' + access_token
          }
        }).then (function onSucces (response){
          console.log("onSuccess: ", response.data.albums.items);
          return response.data.albums.items;
        });

      } else {

        var deferred = $q.defer();
        deferred.reject('You must authorize with Spotify to continue');
        console.log('Reject: ', deferred.promise);
        return deferred.promise;

      }

    }
  }
}());
