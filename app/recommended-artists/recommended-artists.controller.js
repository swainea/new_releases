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

    this.init = function init(){

        SpotifyService.getRecommendedArtists( this.id )
          .then(function (response){
            console.log('recs response: ', response);
            that.recs = response;
          });
    };
}
}());
