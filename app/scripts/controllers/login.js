'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('LoginCtrl', function ($scope, $window) {

    $scope.redirectHome = function(googleUser) {    
    	$window.location.href = '#/home';
  	};
  });
