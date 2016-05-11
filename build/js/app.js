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
;(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$stateParams', '$state'];

  function LoginController($stateParams, $state){
    console.log('in login controller');

    this.oAuth = function oAuth (){
      var client_id = '76448191f52d4674a641b52162d19c85';
      var redirect_uri = 'http://127.0.0.1:3000/#/redirect-uri?access_token';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

      window.location = url;
    };



  }


}());
;(function() {
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

//# sourceMappingURL=app.js.map