'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.pageData = {
    	testData: "hello, notees!"
    }
  });
