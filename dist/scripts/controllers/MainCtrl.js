(function() {
  function MainCtrl($scope, $interval, WORK_SESSION_LENGTH, BREAK_LENGTH, LONG_BREAK_AFTER, LONG_BREAK_LENGTH) {
    $scope.startResetButtonText = "Start";
    $scope.timer = "25:00";
    $scope.time = WORK_SESSION_LENGTH;
    $scope.onBreak = false;
    $scope.sessionNumber = 1;
    var interval;
    
    var mySound = new buzz.sound("../assets/sounds/cowbell.mp3", {
      preload: true
    });
    
    $scope.$watch('this.time', function() {
      if($scope.time === 0) {
        mySound.play();
        $scope.startResetButtonText = "Start";
        $scope.onBreak = !$scope.onBreak;
        if($scope.onBreak && $scope.sessionNumber < LONG_BREAK_AFTER) {
          $scope.timer = "05:00";
          $scope.time = BREAK_LENGTH;
        } else if($scope.onBreak){
          $scope.timer = "30:00";
          $scope.time = LONG_BREAK_LENGTH;
        } else {
          $scope.timer = "25:00";
          $scope.time = WORK_SESSION_LENGTH;
          $scope.sessionNumber++;
        }
        if($scope.sessionNumber > 4) {
          $scope.sessionNumber = 1;
        }
      }
    });
   
    $scope.startResetToggle = function(onBreak) {
      $interval.cancel(this.interval);
    //  if(this.onBreak && this.sessionNumber < LONG_BREAK_AFTER){
    //    this.time = BREAK_LENGTH;
    //  } else if(this.onBreak) {
    //    this.time = LONG_BREAK_LENGTH;
    //  } else {
    //    this.time = WORK_SESSION_LENGTH;
    //  }
      if(this.startResetButtonText === "Start") {
        this.startResetButtonText = "Reset";
        var decrementTime = function() {
          $scope.time = $scope.time - 1;
          var minutes = Math.floor($scope.time / 60);
          var seconds = $scope.time % 60;
          if(minutes < 10) {
            minutes = "0" + minutes;
          }
          if(seconds < 10) {
            seconds = "0" + seconds;
          }
          $scope.timer = minutes + ":" + seconds;
        };
        this.interval = $interval(decrementTime, 1000, this.time);
      } else {
        this.startResetButtonText = "Start";
        if(this.onBreak && this.sessionNumber < LONG_BREAK_AFTER) {
          this.timer = "05:00";
          this.time = BREAK_LENGTH;
        } else if(this.onBreak) {
          this.timer = "30:00";
          this.time = LONG_BREAK_LENGTH;
        } else {
          this.timer = "25:00";
          this.time = WORK_SESSION_LENGTH;
        }
      }
    };
};

  angular
    .module('blocTime')
    .controller('MainCtrl', MainCtrl);
})();