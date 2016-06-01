

myApp.controller('HomeController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
$scope.dataFactory = DataFactory;

  var key = '5433d627c0c62b99a9af9fbbe4227a02';
  var baseURL = 'http://api.petfinder.com/';
  var giphyKey = 'dc6zaTOxFJmzC';
  var giphyBaseURL = 'http://api.giphy.com/';
$scope.giphySearch = '';


  $scope.animal = [];
  $scope.breed = '';
  $scope.types = [{type: 'barnyard',label:'Barnyard Animal'},
  {type: 'bird', label: 'Bird'},
  {type: 'cat', label: 'Cat'},
  {type: 'dog', label: 'Dog'},
  {type: 'horse', label: 'Horse'},
  {type: 'pig', label: 'Pig'},
  {type: 'reptile', label: 'Reptile'},
  {type: 'smallfurry', label: 'Small Furry Animal'}];
  $scope.selectedType = '';
  //$scope.numFavorites = getNumFavorites();
  $scope.favCount = 0;
  var petFave = {};

  if($scope.dataFactory.factoryGetFavorites() === undefined) {
    $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
      $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
    });
  } else {
    $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
  }

$scope.getRandomPet = function () {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    if ($scope.selectedType){
    query += '&animal=' + $scope.selectedType.type;
  }
    query += '&output=basic';
    query += '&format=json';
console.log('sort?', $scope.sorting);
    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;

      }
    )
  }

  $scope.getRandomPetGif = function () {
      var query = '/v1/gifs/random';
      query += '?api_key=' + giphyKey;

      query += '&tag=' + $scope.giphySearch;



      var request = giphyBaseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

      console.log(request);

      $http.jsonp(request).then(
        function(response) {
          console.log(response.data);
        $scope.animalGif = response.data.data.fixed_height_downsampled_url;


        }
      )
    }


$scope.addFavorite = function () {
  var desc = $scope.animal.description.$t;
  petFave.petId = $scope.animal.id.$t;
  petFave.name = $scope.animal.name.$t;
  petFave.imageUrl = $scope.animal.media.photos.photo[3].$t;
  petFave.description = desc ? desc : 'No description';
  petFave.animalType = $scope.animal.animal.$t;

  $scope.dataFactory.factorySaveFavorite(petFave).then(function() {
    console.log('done saving');
    $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
  });


}

function getNumFavorites () {
  $http.get('/pets')
    .then(function (response) {
      $scope.favCount = response.data.length;
      console.log('GET /pets ', response.data);
      console.log($scope.favCount);
    });
}


}]);
