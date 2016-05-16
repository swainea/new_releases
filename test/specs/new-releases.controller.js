(function() {
  'use strict';

  var asser = chai.assert;

  suite('new-releases controller', function(){
    var newReleases, $rootScope;
    var mockSpotifyService = {};

    setup(module('app'));

    setup(module(function($provide){
      $provide.value('SpotifyService', mockSpotifyService);
    }));

    setup(inject(function(_$rootScope_, $controller, $q){
      $rootScope = _$rootScope_;

      newReleases = $controller('NewReleasesController');

      mockSpotifyService.getNewReleases = function ( access_token ){
        var def = $q.defer();
        def.resolve({

        });
        return def.promise;
      };
    }));

    test('sanity tests', function (doneCallback){
      assert.strictEqual(1 === 1, true, 'sanity test');
      doneCallback();
    });

  });
}());
