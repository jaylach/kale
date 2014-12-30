var kale = angular.module('kale', []);

kale.service('Kale', [ 
  function kale() {
    return (function() {
      var Engine = (function() {
        //= #{engine}
      })();

      return new Engine();
    })();
  }
]);