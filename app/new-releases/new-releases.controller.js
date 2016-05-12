(function() {
  'use strict';

  angular
    .module('app')
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['SpotifyService'];

  function NewReleasesController(SpotifyService){
    var that = this;
    this.albumData = [];

    SpotifyService.getNewReleases(localStorage.getItem("access_token"))
      .then(function ( response ){
        console.log("response: ", response);
        that.albumData =  response;
        console.log("this.albumData: ", that.albumData);
      });

  }

}());
