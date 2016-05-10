(function() {
  'use strict';

  angular
    .module('app')
    .controller('RedirectController', RedirectController);

  RedirectController.$inject = ['$state', '$stateParams'];

  function RedirectController ($state, $stateParams){
    console.log("inside RedirectController");
    console.log("Access Token ", $stateParams.access_token);
  }

}());
