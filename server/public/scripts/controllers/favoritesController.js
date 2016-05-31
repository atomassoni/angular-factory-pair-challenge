myApp.controller('FavoritesController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  var key = '5433d627c0c62b99a9af9fbbe4227a02';
  var baseURL = 'http://api.petfinder.com/';

$scope.dataFactory = DataFactory;
$scope.favorites = [];
//$scope.fullDescription = '';
$scope.favCount = 0;
console.log('favorite controller running');


if($scope.dataFactory.factoryGetFavorites() === undefined) {
  $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
    $scope.favorites = $scope.dataFactory.factoryGetFavorites();
    $scope.favCount = $scope.favorites.length;
  });
} else {
  $scope.favorites = $scope.dataFactory.factoryGetFavorites();
  $scope.favCount = $scope.favorites.length;
}



}]);
