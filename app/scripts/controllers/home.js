'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('HomeCtrl', function ($scope, $uibModal, $log, $http, $filter, ENV) {
    $scope.texts = [];
    $scope.todos = [];
    $scope.photos = [];
    $scope.links = [];
    $scope.search = {};
    $scope.searchDate = '';

    var API_NOTES_ENDPOINT = ENV.apiNotesEndpoint;
    console.log(ENV.apiNotesEndpoint);

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

      modalInstance.result.then(function (text) {
        $scope.texts.push(text);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.addList = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'mylist.html',
        controller: 'listInstanceCtrl'
      });

      modalInstance.result.then(function (todo) {
        $scope.todos.push(todo);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.addPhoto = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'myPhoto.html',
        controller: 'photoInstanceCtrl'
      });

      modalInstance.result.then(function (photo) {
        $scope.photos.push(photo);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.addLink = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'mylink.html',
        controller: 'linkInstanceCtrl'
      });
      modalInstance.result.then(function (link) {
        $scope.links.push(link);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.pageData = {
      cards: []
    };
    $scope.stubbedData = {
       cards: [],
       config: {}
    };    
    var card = {
     title: "card title ",
     desc: "card description ",
     imageUrl: "http://cdn.mobileswall.com/wp-content/uploads/2013/12/900-Black-Iron-Man-l.jpg"
    }
    for(var i=0; i<30; i++){
     //var newCard = card;
     var newCard = new Object();
     newCard.id = i+1;
     newCard.title = card.title + (i+1).toString();
     newCard.desc = card.desc + (i+1).toString();
     if(i%3==0) newCard.imageUrl = card.imageUrl;
     $scope.stubbedData.cards[i] = newCard;
    }

    var loadData = function(){
      var getAllNotesPromise = $http.get(API_NOTES_ENDPOINT);
      
      getAllNotesPromise.then(function successCallback(response) {
        //console.log(response);
        $scope.pageData.cards = [];
        $scope.pageData.cards.length = 0;
        $scope.pageData.cards = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });  
    }

    $scope.viewData = function(card){
      console.log(card);
      var modalInstance = $uibModal.open({
        templateUrl: '../../views/view-note.html',
        controller: 'viewCtrl',
        windowClass: 'center-modal',
        resolve: {
            card: function() {
            return card;
          }
        }         
      });
    }

    loadData();
})
.controller('viewCtrl', function($scope, card) {
  console.log(card);
  $scope.card = card;
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
    $scope.createdDate = new Date();
    $scope.category = "text";
    $http({
      method: 'POST',
      url: API_NOTES_ENDPOINT,
      data: { category: $scope.category,
              createdDate:$scope.createdDate,
              note: $scope.text }
      }).then(function successCallback(response) {
        console.log(response);        
      }, function errorCallback(response) {
        console.log(response);
    });
    location.reload();
    $uibModalInstance.dismiss('cancel');
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
    $scope.createdDate = new Date();
    $scope.category = "todo";
    $http({
      method: 'POST',
      url: API_NOTES_ENDPOINT,
      data: { category: $scope.category,
              createdDate:$scope.createdDate,
              note: $scope.todo }
      }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
    });
    location.reload();
    $uibModalInstance.dismiss('cancel');
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
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
      location.reload();
      $uibModalInstance.dismiss('cancel');
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
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
          });
        location.reload();
        $uibModalInstance.dismiss('cancel');
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
    if($scope.link.urls.length == 0 || typeof($scope.link.title) == "undefined") {
      alert("Cannot save an empty note!");
      return;
    }
    if (typeof($scope.link.tags) != "undefined") {
      $scope.link.tags = $scope.link.tags.split(",");
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
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
    });
    location.reload();
    $uibModalInstance.dismiss('cancel');
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
