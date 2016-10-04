(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '../templates/home.html'
      });
  }

  angular
    .module('blocTime', ['ui.router', 'firebase'])
    .config(config);
})();