var kale = angular.module('kale', []);

kale.service('Kale', [ 
  function kale() {
    return (function() {
      var _actions = (function() {
        //= #{actions}
      })();

      var _engine = (function() {
        //= #{engine}
      })();

      var engine = new _engine();

      for ( var key in _actions ) {
        var value = _actions[key];
        engine.addAction(key, value);
      }

      return engine;
    })();
  }
]);