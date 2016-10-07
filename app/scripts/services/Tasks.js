(function() {
  function Tasks($firebaseArray) {
    var ref = firebase.database().ref();
    
    var tasks = $firebaseArray(ref);
    
    return {
      all: tasks
      
    };
  }
  
  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();