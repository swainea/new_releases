(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$stateParams', '$state', 'LoginService'];

  function LoginController($stateParams, $state, LoginService){
    
  }
}());
