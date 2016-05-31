var myApp = angular.module('myApp', ['ngRoute']);



  myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: "HomeController"
      })
      .when('/favorites', {
        templateUrl: '/views/favorites.html',
        controller: "FavoritesController"
      })
      .otherwise({
        redirectTo: 'home'
      })
}]);
