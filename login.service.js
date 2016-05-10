(function() {
  'use strict';

  angular
    .module('app')
    .factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    function LoginService($http){
      
    }
}());
