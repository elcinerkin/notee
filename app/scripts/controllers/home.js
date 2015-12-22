'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('HomeCtrl', function ($scope, $uibModal, $log, $http, $filter, ENV, $rootScope, $window, $cookies) {
    $scope.texts = [];
    $scope.todos = [];
    $scope.photos = [];
    $scope.links = [];
    $scope.search = {};
    $scope.searchDate = '';
    $scope.edit = { enabled: false };
    $scope.user = "";

    var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
    console.log(ENV.apiNotesEndpoint);

    var setCookie = function(){
      $cookies.put('userName', $scope.user);
    }

    $scope.redirectHome = function(googleUser) {  
      $scope.user = googleUser;
      setCookie();  
      $window.location.href = '#/home';
     };

    $scope.formatDate = function(){
      if($scope.searchDate && $scope.searchDate !== null){
        $scope.search.createdDate = $filter('date')($scope.searchDate, 'yyyy-MM-dd');
      } else{
        $scope.search.createdDate = '';
      }      
    };

    $scope.addText = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'myPlainText.html',
        controller: 'textInstanceCtrl'
      });

      modalInstance.result.then(function () {
        $scope.loadData();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.addList = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'mylist.html',
        controller: 'listInstanceCtrl'
      });

      modalInstance.result.then(function () {
        $scope.loadData();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.addPhoto = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'myPhoto.html',
        controller: 'photoInstanceCtrl'
      });

      modalInstance.result.then(function () {
        $scope.loadData();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.addLink = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'mylink.html',
        controller: 'linkInstanceCtrl'
      });
      modalInstance.result.then(function () {
        $scope.loadData();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.pageData = {
      cards: []
    };
    
    $scope.loadData = function(){
      var config = {
        headers: {
          category: 'todo'
        }
      }

      $scope.user = $cookies.get('userName');
      
      var appendUserEmail = function(url){
        if($scope.user && $scope.user.length>0)
          return url.concat("/"+$scope.user);
        else
          return url;
      };

      var getAllNotesPromise = $http.get(appendUserEmail(API_NOTES_ENDPOINT));
      
      getAllNotesPromise.then(function successCallback(response) {
        //console.log(response);
        $scope.pageData.cards = [];
        $scope.pageData.cards.length = 0;
        $scope.pageData.cards = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });  
    }

    $scope.viewModal = '';
    $scope.viewData = function(card){
      console.log(card);
      $scope.viewModal = $uibModal.open({
        templateUrl: '../../views/view-note.html',
        controller: 'ViewCtrl',
        windowClass: 'center-modal',
        resolve: {
            card: function() {
            return card;
          }
        }         
      });
    }

    $scope.updateCard = function(card){
      var updateNotePromise = $http.put(API_NOTES_ENDPOINT + '/' + card._id, card);
      updateNotePromise.then(function(){
        console.log('update successful');
      }, function(){
        console.log('update failed');
      });
    }

    $scope.stopPropagation = function(event){
      event.stopPropagation();
    }

    $rootScope.$on('noteDeleted', function(){
      if($scope.viewModal)
        $scope.viewModal.dismiss('noteDeleted');
      $scope.loadData();
    }); 

    $rootScope.$on('reloadData', function(){
      console.log('reload');
      $('#cardsMasonry').masonry();
    });   

    $scope.loadData();
})
.controller('ViewCtrl', function($uibModalInstance, $log, $http, ENV, $timeout, $rootScope, $scope, card) {
  console.log(card);
  var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
  $scope.edit = { 
    enabled: false, 
    cardChanged: true, 
    newTag: '',
    newTodo: {
      content: '',
      checked: false,
      priority: 'false'
    },
    newLink: {
      content: '',
      description: ''
    } 
  };
  $scope.card = card;
  $scope.originalCard = JSON.stringify(card);

  $rootScope.$on('toggleEditMode', function(){
        $scope.$apply(function(){
          $scope.edit.enabled = !$scope.edit.enabled;      
          console.log($scope.edit.enabled);
        });                
    });

  $scope.addTag = function(tag){
    console.log("Adding tag - " + tag);
    $scope.card.note.tags.push(tag);
    $scope.edit.cardChanged = true;    
    $scope.edit.newTag = '';        
  };

  $scope.addTodo = function(todo){
    console.log("Adding item - " + todo.content);
    $scope.card.note.lists.push(todo);
    $scope.edit.cardChanged = true;    
    $scope.edit.newTodo = {
      content: '',
      checked: false,
      priority: 'false'
    };
  };

  $scope.addLink = function(link){
    console.log("Adding link - " + link.content);
    $scope.card.note.urls.push(link);
    $scope.edit.cardChanged = true;
    $scope.edit.newLink = {
      content: '',
      description: ''
    }
  }

  $scope.deleteTag = function(index){
    console.log("Deleting tag: " + $scope.card.note.tags[index]);
    $scope.card.note.tags.splice(index, 1);
  };

  $scope.deleteTodo = function(index){
    console.log("Deleting list item: " + $scope.card.note.lists[index]);
    $scope.card.note.lists.splice(index, 1);
  }

  $scope.deleteLink = function(index){
    console.log("Deleting link: " + $scope.card.note.urls[index]);
    $scope.card.note.urls.splice(index, 1); 
  }

  $scope.keyPressed = function(event, tag) {
    if (event.keyCode == 13) {
      console.log(tag);
      $scope.addTag(tag);
    }
  };

  $scope.keyPressedOnAddItem = function(event, todo) {
    if (event.keyCode == 13) {
      console.log(todo);
      $scope.addTodo(todo);
    }
  };

  $scope.updateCard = function(card){
    var updateNotePromise = $http.put(API_NOTES_ENDPOINT + '/' + card._id, card);
    updateNotePromise.then(function(){
      $log.info('update successful');
      $scope.originalCard = JSON.stringify(card);
      $scope.edit.enabled = false;
    }, function(){
      $log.info('update failed');
    });      
  };

  $scope.cancel = function(){
    console.log();
    $scope.card = JSON.parse($scope.originalCard);
    $scope.edit.enabled=false;
  };

  $uibModalInstance.result.then(function(){
    $rootScope.$emit("reloadData");
  }, function(){
    $rootScope.$emit("reloadData");
  });
})
.directive('noteeText', function() {
  return {
    templateUrl: '../../views/directives/notee-text.html'
  };
})
.directive('noteeTodo', function() {
  return {
    templateUrl: '../../views/directives/notee-todo.html'
  };
})
.directive('noteeImage', function() {
  return {
    templateUrl: '../../views/directives/notee-image.html'
  };
})
.directive('noteeLinks', function() {
  return {
    templateUrl: '../../views/directives/notee-links.html'
  };
});


angular.module('noteeApp').controller('textInstanceCtrl', function ($scope, $uibModalInstance, $http, ENV) {
  var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
  $scope.ok = function () {
    if(typeof($scope.text) == "undefined" || typeof($scope.text.content) == "undefined") {
        alert("Cannot save an empty note!");
        return;
      }
    if (typeof($scope.text.tags) != "undefined") {
      $scope.text.tags = $scope.text.tags.split(",");
    }
    if (typeof($scope.text.title) == "undefined") {
      $scope.text.title = " ";
    }
    $scope.createdDate = new Date();
    $scope.category = "text";
    $http({
      method: 'POST',
      url: API_NOTES_ENDPOINT,
      data: { category: $scope.category,
              createdDate:$scope.createdDate,
              note: $scope.text }
      }).then(function successCallback(response) {
        $uibModalInstance.close();
      }, function errorCallback(response) {
        console.log(response);
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('noteeApp').controller('listInstanceCtrl', function ($scope, $uibModalInstance,$http, ENV) {
  var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
  $scope.todo = {};
  $scope.todo.lists = [];
  
  $scope.ok = function () {
    if($scope.todo.lists.length == 0) {
      alert("Cannot save an empty note!");
      return;
    }
    if (typeof($scope.todo.tags) != "undefined") {
      $scope.todo.tags = $scope.todo.tags.split(",");
    }
    if (typeof($scope.todo.title) == "undefined") {
      $scope.todo.title = " ";
    }
    $scope.createdDate = new Date();
    $scope.category = "todo";
    $http({
      method: 'POST',
      url: API_NOTES_ENDPOINT,
      data: { category: $scope.category,
              createdDate:$scope.createdDate,
              note: $scope.todo }
      }).then(function successCallback(response) {
        $uibModalInstance.close();
      }, function errorCallback(response) {
        console.log(response);
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.add = function (list) {
    if(typeof($scope.list.checked)=="undefined"){
      $scope.list.checked = false;
    }
    if(typeof($scope.list.priority)=="undefined"){
      $scope.list.priority = false;
    }
    $scope.list = null;
    $scope.todo.lists.push(list);
  };
  $scope.keyPressed = function(event) {
    if (event.keyCode == 13) {
      $scope.add($scope.list);
    }
  }
  $scope.remove = function(index) { 
    $scope.todo.lists.splice(index, 1)     
  }
 });

angular.module('noteeApp').controller('photoInstanceCtrl', function ($scope, $uibModalInstance,$http, ENV) {
  var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
  $scope.ok = function () {
    if(typeof($scope.photo) == "undefined") {
      alert("Cannot save an empty note!");
      return;
    }
    if (typeof($scope.photo.tags) != "undefined") {
      $scope.photo.tags = $scope.photo.tags.split(",");
    }
    if (typeof($scope.photo.title) == "undefined") {
      $scope.photo.title = " ";
    }
    $scope.createdDate = new Date();
    $scope.category = "image";
    if (typeof($scope.photo.image) == "undefined" && document.getElementById("image") == null) {
      alert("Please upload a photo or take a snapshot!");
      return;
    }
    if (typeof($scope.photo.image) == "undefined") {
      $scope.photo.image = document.getElementById("image").src;
      $http({
        method: 'POST',
        url: API_NOTES_ENDPOINT,
        data: { category: $scope.category,
                createdDate:$scope.createdDate,
                note: $scope.photo }
        }).then(function successCallback(response) {
          $uibModalInstance.close();
        }, function errorCallback(response) {
          console.log(response);
        });
    } else {
      // convert File object to base64 string
      var reader  = new FileReader();
      reader.readAsDataURL($scope.photo.image);
      reader.onloadend = function () {
        $scope.photo.image = reader.result;
        $http({
          method: 'POST',
          url: API_NOTES_ENDPOINT,
          data: { category: $scope.category,
                  createdDate:$scope.createdDate,
                  note: $scope.photo }
          }).then(function successCallback(response) {
            $uibModalInstance.close();
          }, function errorCallback(response) {
            console.log(response);
          });
      }
    }
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  /* jshint validthis: true */
  var vm = this;
  vm.picture = false; // Initial state
});

angular.module('noteeApp').controller('linkInstanceCtrl', function ($scope, $uibModalInstance,$http, ENV) {
  var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
  $scope.link = {};
  $scope.link.urls = [];

  $scope.ok = function () {
    if($scope.link.urls.length == 0) {
      alert("Cannot save an empty note!");
      return;
    }
    if (typeof($scope.link.tags) != "undefined") {
      $scope.link.tags = $scope.link.tags.split(",");
    }
    if (typeof($scope.link.title) == "undefined") {
      $scope.link.title = " ";
    }
    $scope.createdDate = new Date();
    $scope.category = "links";
    $http({
      method: 'POST',
      url: API_NOTES_ENDPOINT,
      data: { category: $scope.category,
              createdDate:$scope.createdDate,
              note: $scope.link }
      }).then(function successCallback(response) {
        $uibModalInstance.close();
      }, function errorCallback(response) {
        console.log(response);
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.add = function (url) {
    $scope.url = null;
    $scope.link.urls.push(url);
  };
  $scope.remove = function(index) { 
    $scope.link.urls.splice(index, 1)     
  }
 });
