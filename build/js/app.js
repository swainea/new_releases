(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise(redirect);

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      params: {
        errMsg: null
      }
    })
    .state('new-releases',{
      url: '/new-releases',
      templateUrl: 'new-releases/new-releases.template.html',
      controller: 'NewReleasesController',
      controllerAs: 'nr',
      secure: true
    })
    .state('new-releases.album',{
      url: '/album-view',
      templateUrl: 'album-view/album-view.template.html',
      controller: 'AlbumViewController',
      controllerAs: 'av',
      params: {
        album: null
      }
    })
    .state('recommended-artists', {
      url: '/artist/:id/recommended',
      templateUrl: 'recommended-artists/recommended-artists.template.html',
      controller: 'RecommendedArtistsController',
      controllerAs: 'ra'
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
    .controller('AlbumViewController', AlbumViewController);

  AlbumViewController.$inject = ['$state', '$stateParams', 'SpotifyService'];

  function AlbumViewController($state, $stateParams, SpotifyService){
    var that = this;
    this.album = $stateParams.album;
    this.artistData = [];
    this.errorMessage = "";

    this.init = function init(){
      if(this.album === null){
        $state.go('new-releases');
      } else {
        console.log("this.album: ", this.album );
        SpotifyService.getArtistData( this.album.href )
          .then(function ( response ){
            console.log("response: ", response);
            that.artistData = response;
          })
          .catch(function onError( response ){
            that.errorMessage = "Unable to process request. Please try again.";
          });
      }
    };

    this.close = function close(){
      $state.go('new-releases');
    };
  }
}());
;(function() {
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
;(function() {
  'use strict';

  angular
    .module('app')
    .controller('NewReleasesController', NewReleasesController);

  NewReleasesController.$inject = ['$stateParams', '$state', '$q', 'SpotifyService'];

  function NewReleasesController($stateParams, $state, $q, SpotifyService){
    var that = this;
    this.albumData = [];
    this.errorMessage = "";

    this.init = function init(){
      if (!localStorage.getItem("access_token")){
        $state.go('home', {'errMsg': "Please Login First"} );

      } else {

      return SpotifyService.getNewReleases(localStorage.getItem("access_token"))
        .then(function ( response ){
          that.albumData =  response;
        })
        .catch(function onError ( response ){
          console.log(response);
          if (response === "You must authorize with Spotify to continue"){
            that.errorMessage = "You must authorize with Spotify to continue";
          } else {
            that.errorMessage = "Unable to process request. Please try again.";
          }
        });
      }
    };


  }

}());
;(function() {
  'use strict';

  angular
    .module('app')
    .controller('RecommendedArtistsController', RecommendedArtistsController);

  RecommendedArtistsController.$injet = ['$state', '$stateParams', 'SpotifyService'];

  function RecommendedArtistsController($state, $stateParams, SpotifyService){

    var that = this;
    this.id = $stateParams.id;
    this.recs = [];
    this.errorMessage = "";

    this.init = function init(){
        SpotifyService.getRecommendedArtists( this.id )
          .then(function ( response ){
            console.log('recs response: ', response);
            that.recs = response;
          })
          .catch(function onError ( response ){
            that.errorMessage = "Unable to process request. Please try again.";
          });
    };

    this.back = function back(){
      $state.go('new-releases');
    };

}
}());
;(function() {
  'use strict';

  angular.module('app')
    .directive('fixSize', fixSize);

    function fixSize(){
      return {
        restrict: 'A',
        template: '',
        link: fixSizeLink,
      };
    }

    function fixSizeLink(){
      window.addEventListener('resize', changeTotalHeight);
      function changeTotalHeight() {
        $('.main-section').css('height', window.innerHeight + 'px');
      }
      changeTotalHeight();
    }

}());
;(function() {
  'use strict';

  angular
    .module('app')
    .factory('SpotifyService', SpotifyService);

  SpotifyService.$inject = ['$http', '$q'];

  function SpotifyService ($http, $q){

    return {
      getNewReleases: getNewReleases,
      getArtistData: getArtistData,
      getRecommendedArtists: getRecommendedArtists
    };

    function getNewReleases ( access_token ){
      if (typeof access_token === "string"){

        return $http ({
          method: 'GET',
          url: 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50',
          headers: {
             'Authorization': 'Bearer ' + access_token
          }
        }).then (function onSucces (response){
          // console.log("onSuccess: ", response.data.albums.items);
          return response.data.albums.items;
        });

      } else {

        var deferred = $q.defer();
        deferred.reject('You must authorize with Spotify to continue');
        console.log('Reject: ', deferred.promise);
        return deferred.promise;

      }

    }

      function getArtistData ( href ){
        return $http ({
          method: 'GET',
          url: href
        }).then (function onSuccess (response){
          console.log("onSuccess of getArtistData", response);
          return response.data.artists;
        });
      }

      function getRecommendedArtists ( id ) {
          return $http ({
            method: 'GET',
            url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists'
          }).then (function onSuccess (response){
            console.log('getRelatedArtists onSuccess: ', response);
            return response.data.artists;
          });
        }
      }

}());

//# sourceMappingURL=app.js.map