(function() {
  'use strict';

  var assert = chai.assert;

  suite('login controller', function(){
    var LoginCtrl;

    setup(module('app'));

    setup(inject(function($controller){
      LoginCtrl = $controller('LoginController');
    }));

    // Since I was unable to use $location and had to use window.location I am unable to mock window 
    test('method exisits', function(){
      assert.isFunction(LoginCtrl.oAuth, "oAuth method exisits");
    });

  });
}());
