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

    test('getting new releases', function(doneCallback){
      var token = 123456;
      SpotifyService.getNewReleases(token)
        .then(function(items){
          assert.strictEqual(1 === 1, true, 'sanity test');
          assert.isArray(items, "items returns an array");
          assert.ok(items[0].external_urls, "items includes an external_urls object");
          assert.strictEqual(items.length, 2, 'correct number of results'); 
          doneCallback();
        })
        .catch(function(){
          assert.ok(false, 'should not fail promise');
          doneCallback();
    });
    $httpBackend.flush();
  });

  });
}());
