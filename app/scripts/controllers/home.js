'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('HomeCtrl', function ($scope) {
    console.log("Home Page");

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
    
    $scope.addNote = function(type){
        alert("add "+type);
    };
  });
