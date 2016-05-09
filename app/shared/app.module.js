(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(appConfig)
    .run(appStartup);

  app.Config.$inject = ['$stateProvider', 'urlRouteProvider'];

  function appConfig($stateProvider, $urlRouteProvider){

    $urlRouteProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.login.template.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })
    .state('newReleases',{
      url: '/new-releases',
      templateUrl: 'new-releases/new-releases.tempate.html',
      controller: 'NewReleasesController',
      controllerA: 'nr',
      secure: true
    });
  }


})();
