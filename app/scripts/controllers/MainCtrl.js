(function() {
  function MainCtrl($scope, TimerService, Tasks) {

    var init = function() {
      $scope.timerService = TimerService;
      $scope.newTask = Tasks.new();
      $scope.tasks = Tasks.all;
    };

    $scope.addTask = function(task) {
      Tasks.add(task);
      $scope.newTask = Tasks.new();
    };

    $scope.removeTask = function(task) {
      Tasks.remove(task);
    };

    init();
}

  angular
    .module('blocTime')
    .controller('MainCtrl', ['$scope', 'TimerService', 'Tasks', MainCtrl]);
})();