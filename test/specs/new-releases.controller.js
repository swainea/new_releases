(function() {
  'use strict';

  var assert = chai.assert;

  suite('new-releases controller', function(){
    var newReleases;
    var mockSpotifyService = {};

    setup(module('app'));

    setup(inject(function(_$rootScope_, $controller, $q){
      $rootScope = _$rootScope_;

      newReleases = $controller('NewReleasesController');

      mockSpotifyService.getNewReleases = function ( access_token ){
         
      }

    }));

    test('sanity tests', function (){
      assert.strictEqual(newReleases.errorMessage, "", 'message starts as empty string');
      assert.strictEqual(newReleases.albumData, [], 'albumData starts as an empty array');
    });

    test('init method works', function (doneCallback){
      assert.isFunction(newReleases.init, 'init method exists');
      newReleases.init()
        .then(function(){


          doneCallback();
        })
        .catch(function(){
          assert.ok(false, 'should not reject promise');
          doneCallback();
        });
    });

  });
}());
