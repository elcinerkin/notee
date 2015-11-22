'use strict';
angular.module('authentication.services', [])
	.constant('AUTH_EVENTS', {
	    loginSuccess : 'auth-login-success',
	    loginFailed : 'auth-login-failed',
	    logoutSuccess : 'auth-logout-success',
	    sessionTimeout : 'auth-session-timeout',
	    notAuthenticated : 'auth-not-authenticated',
	    notAuthorized : 'auth-not-authorized'
	})

	.service('Session', function($rootScope) {
	    this.create = function(user) {
	        this.user = user;
	        this.userRole = user.userRole;
	    };
	    this.destroy = function() {
	        this.user = null;
	        this.userRole = null;
	    };
	    return this;
	})

	.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', function($http, $rootScope, $window, Session, AUTH_EVENTS) {

		authService.login() = null;
		authService.isAuthenticated() = null;
		authService.isAuthorized() = null;
		authService.logout() = null;

		return authService;
	}])

	.factory('LoginService', function (SessionService) {
	  return {
	    isAuthenticated: function () {
	      return SessionService.fetchUser();
	    }
	  };
	})

	.factory('SessionService', function ($http, $location) {
	  var SessionService = {};
	  SessionService.fetchUser = function () {
	  	return true;
	    // return $http.get('/user/info')
	    //   .success(function (d) {
	    //     return true;
	    //   })
	    //   .error(function () {
	    //     $location.path('/#/login');
	    //   })
	  };
	  SessionService.returnUser = function (cb) {
	  	return {name:'Test'};
	    // return $http.get('/user/info')
	    //   .success(function (d) {
	    //     console.log('user',d);
	    //     cb(d);
	    //   })
	    //   .error(function () {
	    //     $location.path('/#/login');
	    //   })
	  };

	  return SessionService;
	});