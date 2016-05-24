(function() {
  'use strict';

  angular
    .module('app')
    .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http', '$q'];

  function SpotifyService ($http, $q){

    return {
      getNewReleases: getNewReleases,
      getArtistData: getArtistData,
      getRecommendedArtists: getRecommendedArtists
    };

    function getNewReleases ( access_token ){
      if (typeof access_token === "string"){

        return $http ({
          method: 'GET',
          url: 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50',
          headers: {
             'Authorization': 'Bearer ' + access_token
          }
        }).then (function onSucces (response){
          // console.log("onSuccess: ", response.data.albums.items);
          return response.data.albums.items;
        });

      } else {

        var deferred = $q.defer();
        deferred.reject('You must authorize with Spotify to continue');
        console.log('Reject: ', deferred.promise);
        return deferred.promise;

      }

    }

      function getArtistData ( href ){
        return $http ({
          method: 'GET',
          url: href
        }).then (function onSuccess (response){
          console.log("onSuccess of getArtistData", response);
          return response.data.artists;
        });
      }

      function getRecommendedArtists ( id ) {
          return $http ({
            method: 'GET',
            url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists'
          }).then (function onSuccess (response){
            console.log('getRelatedArtists onSuccess: ', response);
            return response.data.artists;
          });
        }
      }

}());
