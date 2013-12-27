angular.module('jarvis', ['ngRoute', 'jarvis.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'Index'
      });
    $locationProvider.html5Mode(true);
  }]);