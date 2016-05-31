myApp.controller('FavoritesController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  var key = '5433d627c0c62b99a9af9fbbe4227a02';
  var baseURL = 'http://api.petfinder.com/';

$scope.dataFactory = DataFactory;
$scope.favorites = [];
//$scope.fullDescription = '';
$scope.favCount = 0;

//$scope.thisPet = '';
//
// getFavorites();
// getNumFavorites();

// $scope.getPet = function (petId) {
// console.log(petId);
//   var query = 'pet.get';
//   query += '?key=' + key;
//   query += '&id=' + petId;
//   query += '&output=basic';
//   query += '&format=json';
//
//   var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
//
//   $http.jsonp(request).then(
//     function(response) {
//     console.log(response.data);
//       $scope.fullDescription = response.data.petfinder.pet.description.$t;
//       //$scope.thisPet = response.data.petfinder.pet.id.$t;
//     }
//   )
//
// }

if($scope.dataFactory.factoryGetFavorites() === undefined) {
  $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
    $scope.favorites = $scope.dataFactory.factoryGetFavorites();
    $scope.favCount = $scope.favorites.length;
  });
} else {
  $scope.favorites = $scope.dataFactory.factoryGetFavorites();
  $scope.favCount = $scope.favorites.length;
}


  $scope.deleteFavorite = function (id) {
    if (confirm("Remove favorite?")){
    $http.delete('/favorites/' + id)
      .then(function (response) {

        getFavorites();
        getNumFavorites();

      });
    }
  };
//gets all the favorites
  function getFavorites() {
    $http.get('/favorites')
      .then(function (response) {
        $scope.favorites = response.data;
        console.log('GET /favorites ', response.data);
      });
  }
//gets the number of favorites from the databases
  function getNumFavorites () {
    $http.get('/pets')
      .then(function (response) {
        $scope.numFavorites = response.data.numFavorites;
        console.log('GET /pets ', response.data);
      });
  }




}]);
