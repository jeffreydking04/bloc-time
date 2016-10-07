(function() {
  function MainCtrl($scope, TimerService, $firebaseArray) {
    $scope.timerService = TimerService;
   // $scope.tasks = Tasks;
    
    var ref = firebase.database().ref().child("tasks");
    var list = $firebaseArray(ref);
    $scope.task = {jd: ""};
    $scope.add = function() {
       list.$add($scope.task);
    };
    
    list.$remove(list[0]);
   
    
    $scope.list = list;
};

  angular
    .module('blocTime')
    .controller('MainCtrl', ['$scope', 'TimerService', '$firebaseArray', MainCtrl]);
})();