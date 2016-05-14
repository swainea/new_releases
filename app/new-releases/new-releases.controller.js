(function() {
  'use strict';

  angular
    .module('app')
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['$state', 'SpotifyService'];

  function NewReleasesController($state, SpotifyService){
    var that = this;
    this.albumData = [];

    if (!localStorage.getItem("access_token")){
        $state.go('home');

    } else {

    SpotifyService.getNewReleases(localStorage.getItem("access_token"))
      .then(function ( response ){
        console.log("response: ", response);
        that.albumData =  response;
        console.log("that.albumData: ", that.albumData);
        console.log("images: ", that.albumData[0].images[0].url);
        console.log("link to spotify: ", that.albumData[0].external_urls.spotify); 
      });
    }

  }

}());
