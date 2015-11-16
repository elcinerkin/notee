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
  $scope.cards = [];

  $scope.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'myPlainText.html',
      controller: 'ModalInstanceCtrl1'
    });

    modalInstance.result.then(function (text) {
      $scope.texts.push(text);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.open2 = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'mylist.html',
      controller: 'ModalInstanceCtrl2'
    });

    modalInstance.result.then(function (card) {
      $scope.cards.push(card);
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
     imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTjczsATtMa4mkLl1OvY-6BJit4eOX5dDqvh0Wb56P1xaQVYdd-"
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


angular.module('noteeApp').controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close($scope.text);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('noteeApp').controller('ModalInstanceCtrl2', function ($scope, $uibModalInstance) {
  $scope.card = {};
  $scope.card.lists = [];

  $scope.ok = function () {
    $uibModalInstance.close($scope.card);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.add = function (list) {
    $scope.list = null;
    $scope.card.lists.push(list);
  };
 });
