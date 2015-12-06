'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
    .controller('HomeCtrl', function ($scope, $uibModal, $log) {
  $scope.texts = [];
  $scope.todos = [];
  $scope.photos = [];
  $scope.links = [];

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
});


angular.module('noteeApp').controller('textInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    if(typeof($scope.text) == "undefined") {
      $uibModalInstance.dismiss('cancel');
      return;
    }
    $uibModalInstance.close($scope.text);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('noteeApp').controller('listInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.todo = {};
  $scope.todo.lists = [];

  $scope.ok = function () {
    if($scope.todo.lists.length == 0) {
      $uibModalInstance.dismiss('cancel');
      return;
    }
    $uibModalInstance.close($scope.todo);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.add = function (list) {
    $scope.list = null;
    $scope.todo.lists.push(list);
  };

  $scope.remove = function(index) { 
    $scope.todo.lists.splice(index, 1)     
  }
 });

angular.module('noteeApp').controller('photoInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    if(typeof($scope.photo) == "undefined") {
      $uibModalInstance.dismiss('cancel');
      return;
    }
    $uibModalInstance.close($scope.photo);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


  /* jshint validthis: true */
  var vm = this;
  vm.picture = false; // Initial state
});

angular.module('noteeApp').controller('linkInstanceCtrl', function ($scope, $uibModalInstance) {
  $scope.link = {};
  $scope.link.urls = [];

  $scope.ok = function () {
    if($scope.link.urls.length == 0) {
      $uibModalInstance.dismiss('cancel');
      return;
    }
    $uibModalInstance.close($scope.link);
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
