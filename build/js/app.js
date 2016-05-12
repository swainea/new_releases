(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(appConfig);
   // .run(appStartup);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise(redirect);

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html'
    })
    .state('new-releases',{
      url: '/new-releases',
      templateUrl: 'new-releases/new-releases.template.html',
      controller: 'NewReleasesController',
      controllerAs: 'nr'
      // secure: true
    });

    function redirect (){
      if (window.location.pathname === '/') {
        // if redirected to home, split the query string on the "&" to create and array of
        // parameter names and values
        var query = window.location.hash.substr(2).split('&');
        //created an array of parameter names to check if boolen isLoginRedirect is true
        var parameterNames = ["access_token", "token_type", "expires_in"];
        // set isLoginRedirect to true because that is our expected behavior
        var isLoginRedirect = true;
        // created a forEach loop that loops over each instance in the the array "query"
        query.forEach(function findQueryParam( parameter ){
          //will split each parameter on the '=' and hold onto the keys and values in an array for each
          var parameterPieces = parameter.split('=');
          // if the particualr instance index 0 = access_token, we will save the value (index 1) in localStorage
          if (parameterPieces[0] === "access_token"){
            localStorage.setItem( "access_token", parameterPieces[1]);
          }
          //if the index of the first index in parameterPieces does not match parameterNames isLoginRedirect will be set to false
          if (parameterNames.indexOf(parameterPieces[0]) < 0) {
            isLoginRedirect = false;
          }
        });
        //if redirected to home check to see if I have all four parameterNames in redirect
        if (query.length === parameterNames.length && isLoginRedirect) {
          console.log('valid redirect!');
          // validated a successful redirct and switch view to new releases
          return '/new-releases';
        } else {
          //redirect home to login
          return '/';
        }
      } else {
        //redirect home to login
        return '/';
      }
    }
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
      var redirect_uri = 'http://127.0.0.1:3000';

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
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['SpotifyService'];

  function NewReleasesController(SpotifyService){
    console.log("inside NewReleasesController");
    SpotifyService.getNewReleases(localStorage.getItem("access_token"));
  }

}());
;(function() {
  'use strict';

  angular
    .module('app')
    .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http'];

  function SpotifyService ($http){

    return {
      getNewReleases: getNewReleases
    };

    function getNewReleases ( access_token ){
      console.log("access_token: ", access_token);
      return $http ({
        method: 'GET',
        url: 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50',
        headers: {
           'Authorization': 'Bearer ' + access_token
        },
      }).then (function onSucces (response){
        console.log("onSuccess: ", response);
        return response;
      }, function onError (response){
        console.log("onError", response);
      });
    }
  }
}());

//# sourceMappingURL=app.js.map