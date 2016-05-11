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
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html'
    })
    .state('redirect',{
      url: '/redirect-uri?access_token',
      templateUrl: 'redirect-uri/redirect-uri.template.html',
      controller: 'RedirectController',
      controllerAs: 'rc'
    })
    .state('new-releases',{
      url: '/new-releases',
      template: '<h2>New Releases</h2>'
      // templateUrl: 'new-releases/new-releases.tempate.html',
      // controller: 'NewReleasesController',
      // controllerAs: 'nr',
      // secure: true
    });
  }


})();
