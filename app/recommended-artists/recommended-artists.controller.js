(function() {
  'use strict';

  angular
    .module('app')
    .controller('RecommendedArtistsController', RecommendedArtistsController);

  RecommendedArtistsController.$injet = ['$state', '$stateParams', 'SpotifyService'];

  function RecommendedArtistsController($state, $stateParams, SpotifyService){

    var that = this;
    this.id = $stateParams.id;
    this.recs = [];
    this.errorMessage = "";

    this.init = function init(){
        SpotifyService.getRecommendedArtists( this.id )
          .then(function ( response ){
            console.log('recs response: ', response);
            that.recs = response;
          })
          .catch(function onError ( response ){
            that.errorMessage = "Unable to process request. Please try again.";
          });
    };

    this.back = function back(){
      $state.go('new-releases');
    };

}
}());
