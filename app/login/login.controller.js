(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$stateParams'];

  function LoginController($stateParams){
    this.errMsg = $stateParams.errMsg;
    console.log("errMsg: ", this.errMsg);

    this.oAuth = function oAuth (){

      var client_id = '76448191f52d4674a641b52162d19c85';
      var redirect_uri = 'http://127.0.0.1:3000';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

      // $location was not redirecting properly because spotify was eliminating angular's '#' so I've used window.location
      window.location = url;
    };



  }


}());
