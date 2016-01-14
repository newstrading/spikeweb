//var app = angular.module('myApp', []);

angular.module('root', [])

.controller("index", ["$scope", function($scope) {
  $scope.message = "Hello World!";
}])

.controller("willy", ["$scope", "$http", function($scope, $http) {
  $scope.eiid = '';
  $scope.releases = [];
  $scope.eventList = [];
  $scope.desc = {};

  $http.get('api/ei').success(function(data) {
    // after receiving the JSON data from the web-api call, set the start data of the model
    console.log("ei list received: items:" + data.length);
    //console.log("data= " + JSON.stringify(data));
    $scope.releases = data;
  });

  $scope.change = function() {
    console.log("ei changed to: " + $scope.eiid);

    var reqUrl = 'api/history/' + $scope.eiid.EIid;
    console.log("requesting history.. " + reqUrl);
    $http.get(reqUrl).success(function(data) {
      // after receiving the JSON data from the web-api call, set the start data of the model
      console.log("ei history received: items:" + data.length);
      //console.log("ei data= " + JSON.stringify(data));
      $scope.eventList = data;
    });

    reqUrl = 'api/desc/' + $scope.eiid.EIid;
    console.log("requesting desc.. " + reqUrl);
    $http.get(reqUrl).success(function(data) {
      // after receiving the JSON data from the web-api call, set the start data of the model
      console.log("ei desc received.");
      //console.log("ei data= " + JSON.stringify(data));
      $scope.desc = data;
    });
  };




}]);
