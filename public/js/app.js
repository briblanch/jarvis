angular.module('jarvis', ['ngRoute', 'jarvis.controllers', 'jarvis.services']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index'
      }).
      when('/login', {
        templateUrl: 'partials/login',
        controller: 'Auth'
      }).
      when('/register', {
        templateUrl: 'partials/register',
        controller: 'Auth'
      }).
      when('/jarvis', {
        templateUrl: 'partials/jarvis',
        controller: 'Jarvis'
      });
    $locationProvider.html5Mode(true);
  }]);