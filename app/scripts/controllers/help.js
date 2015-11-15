'use strict';

/**
 * @ngdoc function
 * @name noteeApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the noteeApp
 */
angular.module('noteeApp')
  .controller('HelpCtrl', function ($scope) {
    $scope.pageData = {
    	testData: "hello, notees!"
    }
  });
