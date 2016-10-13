(function() {
  function Tasks($firebaseArray) {
    var tasks;

    var init = function() {
      tasks = $firebaseArray(firebase.database().ref().child("tasks"));
    };
    
    var addTask = function(task) {
      tasks.$add(task);
    };

    var removeTask = function(task) {
      tasks.$remove(task);
    };

    var newTask = function() {
      return {
        title: "",
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
    };

    init();

    return {
      all: tasks,
      new: newTask,
      add: addTask,
      remove: removeTask
    };
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();