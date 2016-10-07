(function() {
  function Tasks($firebaseArray) {
    var Tasks = {};
    var ref = firebase.database().ref().child("tasks");
    var tasksArray = $firebaseArray(ref);
    
    Tasks.add = function() {
       tasksArray.$add(Tasks.newTask);
    };

    Tasks.tasks = tasksArray;

    return Tasks;
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();