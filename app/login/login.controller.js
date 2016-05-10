(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$stateParams', '$state'];

  function LoginController($stateParams, $state){
    console.log('in login controller');

    this.oAuth = function oAuth (){
      console.log("inside oAuth");
      var client_id = '76448191f52d4674a641b52162d19c85';
      var redirect_uri = 'inserthere';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);


      window.location = url;
    };


  }


}());
