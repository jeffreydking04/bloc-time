(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
    });


  };

  angular
    .module('blocTime', ['ui.router', 'firebase'])
    .config(config)
    .constant('WORK_SESSION_LENGTH', 6)
    .constant('BREAK_LENGTH', 3)
    .constant('LONG_BREAK_LENGTH', 10)
    .constant('LONG_BREAK_AFTER', 4);
})();
