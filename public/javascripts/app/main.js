var app = angular.module('skyRider', ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
    $routeProvider
        .when('/onlineGraph',{
            templateUrl: '/onlineGraph.html'
        })
        .when('/dbGraph',{
            templateUrl: '/dbGraph.html'
        })
        .otherwise({
            templateUrl: '/'
        });
})