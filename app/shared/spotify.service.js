(function() {
  'use strict';

  angular
    .module('app')
    .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http'];

  function SpotifyService ($http){

    return {
      getNewReleases: getNewReleases
    };

    function getNewReleases ( access_token ){
      console.log("access_token: ", access_token);
      return $http ({
        method: 'GET',
        url: 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50',
        headers: {
           'Authorization': 'Bearer ' + access_token
        },
      }).then (function onSucces (response){
        console.log("onSuccess: ", response);
        return response;
      }, function onError (response){
        console.log("onError", response);
      });
    }
  }
}());
