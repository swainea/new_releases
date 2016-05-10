(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(appConfig);
   // .run(appStartup);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'login/login.template.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })
    .state('redirect',{
      url: '/redirect-uri?access_token',
      templateUrl: 'redirect-uri/redirect-uri.template.html',
      controller: 'RedirectController',
      controllerAs: 'rc'
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