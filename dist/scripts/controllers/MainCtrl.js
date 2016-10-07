(function() {
  function MainCtrl($scope, TimerService, Tasks, $firebaseArray) {
    $scope.timerService = TimerService;
    $scope.tasks = Tasks;
};

  angular
    .module('blocTime')
    .controller('MainCtrl', ['$scope', 'TimerService', 'Tasks', '$firebaseArray', MainCtrl]);
})();