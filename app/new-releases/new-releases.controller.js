(function() {
  'use strict';

  angular
    .module('app')
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['SpotifyService'];

  function NewReleasesController(SpotifyService){
    console.log("inside NewReleasesController");
    SpotifyService.getNewReleases(localStorage.getItem("access_token"));
  }

}());
