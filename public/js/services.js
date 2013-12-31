var services = {};
// Start HueService
services.HueService = function($http, $q) {
    var bridgeIp;
    var hueUsername;

    var findBridges = function() {
        var deferred = $q.defer();
        var apiUrl = 'http://www.meethue.com/api/nupnp'

        $http.get(apiUrl).then(function(result){
            bridgeIp = result.data[0].internalipaddress;
            deferred.resolve();
        });

        return deferred.promise;
    };

    var registerUser = function() {
        var deferred = $q.defer();
        var apiUrl = "http://" + bridgeIp + "/api"
        var json = {
            devicetype: "Macbook"
        };

        $http.post(apiUrl, json).then(function(result) {
            if (result.data[0].error) {
                deferred.reject();
            } else {
                hueUsername = result.data[0].success.username;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var setUserHueInformation = function() {
        var deferred = $q.defer();
        var apiUrl = '/api/sethueinfo';

        var json = {
            bridgeIp: bridgeIp,
            hueUsername: hueUsername
        };

        $http.post(apiUrl, json).then(deferred.resolve, deferred.reject);
    };

    return {
        findBridges: findBridges,
        registerUser: registerUser,
        setUserHueInformation: setUserHueInformation
    }
};

services.HueService.$inject = ['$http', '$q'];
// End HueService

// Start AuthenticationService
services.Authentication = function($http, $q) {
    var register = function(username, password) {
        var deferred = $q.defer();
        var apiUrl = '/api/register'

        var json = {
            username: username,
            password: password
        };

        $http.post(apiUrl, json)
            .then(function(result) {
                deferred.resolve();
            });

        return deferred.promise
    };

    var login = function(username, password) {
        var deferred = $q.defer();
        var apiUrl = '/api/login'

        var json = {
            username: username,
            password: password
        };

        $http.post(apiUrl, json)
            .then(function(result) {
                deferred.resolve();
            }, function(err) {
                deferred.reject(err);
            });

        return deferred.promise
    };

    return {
        register: register,
        login: login
    }
};

services.Authentication.$inject = ['$http', '$q'];
// End Authentication Service

var servicesModule = angular.module('jarvis.services', []);

servicesModule.factory('Hue', services.HueService);
servicesModule.factory('Auth', services.Authentication);
