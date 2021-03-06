(function() {
  'use strict';

  angular
    .module('app')
    .controller('AlbumViewController', AlbumViewController);

  AlbumViewController.$inject = ['$state', '$stateParams', 'SpotifyService'];

  function AlbumViewController($state, $stateParams, SpotifyService){
    var that = this;
    this.album = $stateParams.album;
    this.artistData = [];
    this.errorMessage = "";

    this.init = function init(){
      if(this.album === null){
        $state.go('new-releases');
      } else {
        console.log("this.album: ", this.album );
        SpotifyService.getArtistData( this.album.href )
          .then(function ( response ){
            console.log("response: ", response);
            that.artistData = response;
          })
          .catch(function onError( response ){
            that.errorMessage = "Unable to process request. Please try again.";
          });
      }
    };

    this.close = function close(){
      $state.go('new-releases');
    };
  }
}());
