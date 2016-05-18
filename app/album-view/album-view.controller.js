(function() {
  'use strict';

  angular
    .module('app')
    .controller('AlbumViewController', AlbumViewController);

  AlbumViewController.$inject = ['$state', '$stateParams', 'SpotifyService'];

  function AlbumViewController($state, $stateParams, SpotifyService){
    var that = this;
    this.album = $stateParams.album;
    console.log(this.album);
    this.artistData = [];

    this.init = function init(){
      if(this.album === null){
        $state.go('new-releases');
      } else {
        SpotifyService.getArtistData( this.album.href )
          .then(function ( response ){
            console.log("response: ", response);
            that.artistData = response;
          });
      }
    };

    this.listen = function listen(){
       
    }
  }
}());
