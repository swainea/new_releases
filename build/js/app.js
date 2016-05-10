(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(appConfig);
  //   // .run(appStartup);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'login/login.template.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    });

    // .state('newReleases',{
    //   url: '/new-releases',
    //   templateUrl: 'new-releases/new-releases.tempate.html',
    //   controller: 'NewReleasesController',
    //   controllerAs: 'nr',
    //   secure: true
    // });
  }


})();
;(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$stateParams', '$state'];

  function LoginController($stateParams, $state){
    console.log('in login controller');
  }
}());

//# sourceMappingURL=app.js.map