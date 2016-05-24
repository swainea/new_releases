(function() {
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
