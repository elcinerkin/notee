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
    'authentication.services'
  ])


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
});