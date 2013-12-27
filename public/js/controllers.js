//Initial setup of app
var controllers = {};

controllers.index = function($scope, $http, $location) {
    $scope.username;
    $scope.password;

    $scope.signup= function() {
        $http.post('/api/register', {username: $scope.username,
                                    password: $scope.password })
        .then(function(data) {

        });
    };
};

controllers.index.$inject = ['$scope', '$http'];

angular.module('jarvis.controllers', [])
    .controller('Index', controllers.index);