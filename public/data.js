//var app = angular.module('myApp', []);

angular.module( 'root', [])

.controller("index", ["$scope", function ($scope) {
        $scope.message = "Hello World!";
}])

.controller("willy", ["$scope", "$http",  function ($scope, $http) {
        $scope.message = "Hello Willy!";

        var releases = [{
          EIId: 999,
          Name: "NO DATA RECEIVED"
        }];

        $scope.eiid = '';
        $scope.releases = releases;

        $http.get('api/ei').success( function(data) {
          // after receiving the JSON data from the web-api call, set the start data of the model
          console.log("ei list received: " + data.length);
          console.log("data= " + JSON.stringify(data));
          $scope.releases = data;
        });

}])


;
