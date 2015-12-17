'use strict';

/**
 * @ngdoc overview
 * @name noteeApp
 * @description
 * # noteeApp
 *
 * Main module of the application.
 */
angular
  .module('noteeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'wu.masonry',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'authentication.services',
    'camera',
    'config'
  ])
  
  .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
  }])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('login', {
        url:'/login',
        templateUrl:'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('/', {
        url:'/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .state('about', {
        url:'/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('help', {
        url:'/help',
        templateUrl: 'views/help.html',
        controller: 'HelpCtrl'
      })
      .state('home', {
        url:'/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/login');
})

.run(function($rootScope, LoginService, $location, $state) {

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    // if is not logged in
    if (!LoginService.isAuthenticated()) {
      console.log('not authenticated');
      // redirect back to login
      $location.path('/login');
    }
  })
})

.controller('headerCtrl', function($scope, $location){
  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
  }
});