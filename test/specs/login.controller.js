(function() {
  'use strict';

  var assert = chai.assert;

  suite('login controller', function(){
    var LoginCtrl;

    setup(module('app'));

    setup(inject(function($controller){
      LoginCtrl = $controller('LoginController');
    }));


    test('method exisits', function(){
      assert.isFunction(LoginCtrl.oAuth, "oAuth method exisits");
    });

  });
}());
