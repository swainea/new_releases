(function() {
  'use strict';

  angular
    .module('app')
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['$stateParams', '$state', '$q', 'SpotifyService'];

  function NewReleasesController($stateParams, $state, $q, SpotifyService){
    var that = this;
    this.albumData = [];
    this.errorMessage = "";

    this.init = function init(){
      if (!localStorage.getItem("access_token")){
        // I need to pass an error message as a state param into the login
        $state.go('home', {'errMsg': "Please Login First"} );

      } else {

      return SpotifyService.getNewReleases(localStorage.getItem("access_token"))
        .then(function ( response ){
          that.albumData =  response;
        })
        .catch(function onError ( reponse ){
          that.errorMessage = "Unable to process request. Please try again.";
        });
      }
    };


  }

}());
