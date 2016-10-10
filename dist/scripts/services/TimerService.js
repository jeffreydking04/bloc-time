(function() {
  function TimerService($interval, WORK_SESSION_LENGTH, BREAK_LENGTH, LONG_BREAK_AFTER, LONG_BREAK_LENGTH) {
    var TimerService = {};

    // private variables
    var mySound = new buzz.sound("../assets/sounds/cowbell.mp3", {
      preload: true
    });
    var interval;
    var time = WORK_SESSION_LENGTH;
    var sessionNumber = 0;
    var onBreak = false;

    // public variables (used in the view)
    TimerService.timer = "25:00";  // text for displaying the time remaining in the countdown timer
    TimerService.startResetButtonText = "Start"; // button text

    // The user, at this point (10-7-2016), can only interact with
    // the timer by pressing a button, which triggers this function.
    // If the timer is at original position, this function starts
    // the countdown.
    // If the timer is active, this function resets the timer, but
    // does not restart it.
    TimerService.startResetToggle = function() {
      $interval.cancel(interval);
      if(TimerService.startResetButtonText === "Start") {
        TimerService.startResetButtonText = "Reset";
        var decrementTime = function() {
          time = time - 1;
          var minutes = Math.floor(time / 60);
          var seconds = time % 60;
          if(minutes < 10) {
            minutes = "0" + minutes;
          }
          if(seconds < 10) {
            seconds = "0" + seconds;
          }
          TimerService.timer = minutes + ":" + seconds;
          if(time < 1) {
            resetCounter();
          }
        };
        interval = $interval(decrementTime, 1000, time);
      } else {
        TimerService.startResetButtonText = "Start";
        setCounter();
      }
    };

    // private function to keep code DRY
    var setTime = function(timerValue, timeValue) {
      TimerService.timer = timerValue;
      time = timeValue; 
    };

    // private function to keep code DRY
    var setCounter = function() {
      if(TimerService.onBreak && sessionNumber < LONG_BREAK_AFTER) {
        setTime("05:00", BREAK_LENGTH);
      } else if(TimerService.onBreak) {
        setTime("30:00", LONG_BREAK_LENGTH);
      } else {
        setTime("25:00", WORK_SESSION_LENGTH);
      }
    };    

    // private function that is called when the timer hits 0
    // It tracks the number of work sessions completed,
    // alternates work sessions with short breaks,
    // and calls for a long break every 4th break.
    var resetCounter =  function() {
      mySound.play();
      if(!TimerService.onBreak) { sessionNumber++; }
      TimerService.startResetButtonText = "Start";
      TimerService.onBreak = !TimerService.onBreak;
      setCounter();
      if(sessionNumber > 3) {
        sessionNumber = 0;
      }
    };

    return TimerService;
  };
  
  angular
    .module('blocTime')
    .factory('TimerService', ['$interval', 'WORK_SESSION_LENGTH', 'BREAK_LENGTH', 'LONG_BREAK_AFTER', 'LONG_BREAK_LENGTH', TimerService]);
})();