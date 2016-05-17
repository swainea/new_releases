(function() {
  'use strict';

  angular
    .module('app')
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['$state', '$q', 'SpotifyService'];

  function NewReleasesController($state, $q, SpotifyService){
    var that = this;
    this.albumData = [];
    this.errorMessage = "";

    this.init = function init(){
      if (!localStorage.getItem("access_token")){

        $state.go('home');

        var deferred = $q.defer();
        deferred.reject('You must authorize with Spotify to continue');
        console.log('Reject: ', deferred.promise);
        return deferred.promise;

      } else {

      return SpotifyService.getNewReleases(localStorage.getItem("access_token"))
        .then(function ( response ){
          // console.log("response: ", response);
          that.albumData =  response;

          // console.log("that.albumData: ", that.albumData);
          // console.log("images: ", that.albumData[0].images[0].url);
          // console.log("link to spotify: ", that.albumData[0].external_urls.spotify);
        })
        .catch(function onError ( reponse ){
          console.log ('error response: ', response );
          that.errorMessage = "Unable to process request. Please try again.";
        });
      }
    };


  }

}());
