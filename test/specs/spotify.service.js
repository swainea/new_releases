(function() {
  'use strict';

  var assert = chai.assert;

  suite('spotify service', function(){
    var SpotifyService, $httpBackend;

    setup(module('app'));

    setup(inject(function(_SpotifyService_, _$httpBackend_){
      SpotifyService = _SpotifyService_;
      $httpBackend = _$httpBackend_;

      $httpBackend
      .whenGET('https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50')
      .respond(
        {
          albums: {
            items: [{
              external_urls: {
                spotify: 'https://test.testalbum/test'
              },
              href: 'https://test.test.com/test',
              id: '123',
              images: [
                { height: 640, url: 'https://test.test.com/testimage', width: 640 },
                { height: 300, url: 'https://test.test.com/testimage', width: 300 },
                { height: 64, url: 'https://test.test.com/testimage', width: 64 }
              ],
              name: 'NewAlbumTestName',
              type: 'album'
            },
            {
              external_urls: {
                spotify: 'https://test.testalbum/test'
              },
              href: 'https://test.test.com/test',
              id: '425',
              images: [
                { height: 640, url: 'https://test.test.com/testimage2', width: 640 },
                { height: 300, url: 'https://test.test.com/testimage2', width: 300 },
                { height: 64, url: 'https://test.test.com/testimage2', width: 64 }
              ],
              name: 'NewAlbumTestName2',
              type: 'album'
            }
          ]
        }
      }
    );
  }));

  test('service methods exist', function(){
    assert.isFunction(SpotifyService.getNewReleases, "getNewReleases method exisits");
  });

  test('getNewReleases functions as expected', function(doneCallback){
    var token = 123456;
    var returnValue = SpotifyService.getNewReleases(token);
    assert.ok(returnValue, 'returnValue exisits');
    assert.isFunction(returnValue.then, 'returnValue returns a promise');

    returnValue.then(function(items){
      assert.isArray(items, "items returns an array");
      doneCallback();
    })
    .catch(function(){
      assert.ok(false, 'should not fail promise');
      doneCallback();
    });
    $httpBackend.flush();
  });

  test('invalid access token', function(){
    var token = "null";
    var returnValue = SpotifyService.getNewReleases(token);

    returnValue.then(function(){
      assert.ok(false, 'should not send request');
      doneCallback();
    })
    .catch(function(){
      // here i want to assert that we get into the catch if invalid token
      doneCallback();
    });
    $httpBackend.flush();
  });


});
}());
