(function() {
  function TimerService($interval, WORK_SESSION_LENGTH, BREAK_LENGTH, LONG_BREAK_AFTER, LONG_BREAK_LENGTH) {
    var TimerService = {};
    
    /**
    * private variable to hold sound object that is played at 
    * the end of a session
    */
    var mySound = new buzz.sound("../assets/sounds/cowbell.mp3", {
      preload: true
    });
    
    /**
    * private variable that stores the active delayed function call
    * allows us to stop to cancel the current countdown
    */
    var interval;
    
    /**
    * private variable that stores the time remaining in the session/break
    * in seconds
    */
    var time = WORK_SESSION_LENGTH;
    
    /**
    * private variable that stores the number of sessions a worker
    * has worked since the last long break
    */
    var sessionNumber = 0;    
    
    /**
    * private function to set timer and time variables
    */
    var setTime = function(timerValue, timeValue) {
      TimerService.timer = timerValue;
      time = timeValue; 
    };
    
    /**
    * private function to set counter based on status
    */
    var setCounter = function() {
      if(TimerService.onBreak && sessionNumber < LONG_BREAK_AFTER) {
        setTime("05:00", BREAK_LENGTH);
      } else if(TimerService.onBreak) {
        setTime("30:00", LONG_BREAK_LENGTH);
      } else {
        setTime("25:00", WORK_SESSION_LENGTH);
      }
    };    
    
    /**
    * public boolean variable that stores whether or not the worker
    * is on a break (true) or working (false)
    */
    TimerService.onBreak = false;
    
    /**
    * public variable that stores current value of displayed timer
    */
    TimerService.timer = "25:00";
    
    /**
    * public variable that stores the text in the starrt/reset Button
    */
    TimerService.startResetButtonText = "Start";
    
    /**
    * private function to reset the counter after a session or break 
    * is finished
    * it plays a sound to commemorate the finishing of a session
    * it resets the button text and it keeps track of the 
    * number of sessions, inserting a long break at the
    * end of 4 sessions
    */
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
    
    /**
    * public function that cancels current timer, toggles text
    * in start/reset button appropriately, resets timer value
    * if the action is a reset, starts a new timer countdown
    * if the action is a start
    * the parameter onBreak is a Boolean that helps determine
    * the counter value
    */
    TimerService.startResetToggle = function() {
      $interval.cancel(interval);
      if(TimerService.startResetButtonText === "Start") {
        TimerService.startResetButtonText = "Reset";
        
        /**
        * function private to this conditional
        * when called, it decrements the time by one second
        */
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
    
    return TimerService;
  };
  
  angular
    .module('blocTime')
    .factory('TimerService', ['$interval', 'WORK_SESSION_LENGTH', 'BREAK_LENGTH', 'LONG_BREAK_AFTER', 'LONG_BREAK_LENGTH', TimerService]);
})();