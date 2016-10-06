(function() {
  function MainCtrl($scope, TimerService) {
    $scope.timerService = TimerService;
};

  angular
    .module('blocTime')
    .controller('MainCtrl', ['$scope', 'TimerService', MainCtrl]);
})();