'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('LoginCtrl', function ($scope, $window, $rootScope) {
    $scope.redirectHome = function(googleUser) {    
    	$rootScope.homeVisible =true;
    	$window.location.href = '#/home';
  	};

  	$scope.signOut = function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          $rootScope.homeVisible =false;
        });
      }
  });
