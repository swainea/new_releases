(function() {
  'use strict';

  angular
  .module('app')
  .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http'];

  function SpotifyService($http){

    return{
      newReleases: newReleases
    };

    function getNewReleases(){

      return $http ({
        method: 'GET',
        url: 'https://api.spotify.com/v1/browse/new-releases',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },

      }).then (function onSuccess(response){
        console.log(response);
        return response;
      }, function error(response){
        console.log(response);
      }
    );
  }

}
}());
