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
      var redirect_uri = 'http://127.0.0.1:3000/redirect-uri/redirect-uri.template.html';

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

  RedirectController.$inject = ['$state', '$stateParams'];

  function RedirectController ($state, $stateParams){
    console.log("inside RedirectController");
    console.log("Access Token ", $stateParams.access_token);
  }

}());
;(function() {
  'use strict';

  angular
  .module('app')
  .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http'];

  function SpotifyService($http){

    return{
      newReleases: newReleases
    };

    function getNewReleases(){

      return $http ({
        method: 'GET',
        url: 'https://api.spotify.com/v1/browse/new-releases',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },

      }).then (function onSuccess(response){
        console.log(response);
        return response;
      }, function error(response){
        console.log(response);
      }
    );
  }

}
}());

//# sourceMappingURL=app.js.map