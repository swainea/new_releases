(function() {
  'use strict';

  angular
    .module('app')
    .controller('RedirectController', RedirectController);

  RedirectController.$inject = ['$stateParams', '$state'];

  function RedirectController ($stateParams, $state){
    console.log("inside RedirectController");
    console.log("Access Token ", $stateParams.access_token);
    localStorage.setItem( "token", $stateParams.access_token );
    // $state.go( "new-releases" );

  }

}());
