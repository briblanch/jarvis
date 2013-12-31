//Initial setup of app
var controllers = {};

controllers.auth = function($scope, $location, Auth) {
    $scope.username;
    $scope.password;

    $scope.loginError = false;

    $scope.signUp = function() {
        Auth.register($scope.username, $scope.password).then(function() {
            $location.path('/jarvis');
        });
    };

    $scope.login = function() {
        Auth.login($scope.username, $scope.password).then(function() {
            $location.path('/jarvis');
        }, function(err) {
            $scope.loginError = true;
        });
    }
};

controllers.auth.$inject = ['$scope', '$location', 'Auth'];

controllers.jarvis = function($scope, Hue) {
    $scope.pushButtonPrompt = false;

    var promptPushButton = function() {
        $scope.pushButtonPrompt = true;
    };

    var setupHue = function() {
        $('#setupModal').modal('show');
        Hue.findBridges()
            .then(Hue.registerUser)
            .then($scope.finishSetup, promptPushButton);
    };

    $scope.finishSetup = function() {
        Hue.registerUser().then(function() {
            Hue.setUserHueInformation();
            $('#setupModal').modal('hide');
        })
    };

    setupHue();
};

controllers.jarvis.$inject = ['$scope', 'Hue'];

var controllerModule = angular.module('jarvis.controllers', []);

controllerModule.controller('Auth', controllers.auth);
controllerModule.controller('Jarvis', controllers.jarvis);
