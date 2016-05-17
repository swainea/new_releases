(function() {
  'use strict';

  angular
    .module('app')
    .controller('AlbumViewController', AlbumViewController);

  AlbumViewController.$inject = ['$stateParams'];

  function AlbumViewController($stateParams){
    console.log("Params: ", $stateParams.album);
  }
}());
