//var app = angular.module('myApp', []);

angular.module('root', ["webix" ])

.controller("index", ["$scope", function($scope) {
  $scope.message = "Hello World!";
}])

.controller("willy", ["$scope", "$http", , function($scope, $http) {

  $scope.eiid = '';

  $scope.releases = [{
    EIId: 999,
    Name: "NO DATA RECEIVED"
  }];;

  $scope.eventList = [{
    EventDate: "2015-09-12",
    Actual: 9.99,
    Estimate: 12.9,
    SpikePips: 10,
    symbol: "EURUSD"
  }, {
    EventDate: "2015-09-12",
    Actual: 9.99,
    Estimate: 12.9,
    SpikePips: 10,
    symbol: "EURUSD"
  }, {
    EventDate: "2015-09-12",
    Actual: 9.99,
    Estimate: 12.9,
    SpikePips: 10,
    symbol: "EURUSD"
  }, {
    EventDate: "2015-09-12",
    Actual: 9.99,
    Estimate: 12.9,
    SpikePips: 10,
    symbol: "EURUSD"
  }];

  $scope.change = function() {
    console.log("ei changed to: " + $scope.eiid);
    var reqUrl = 'api/data/' + $scope.eiid.EIid;
    console.log("requesting.. " + reqUrl);
    $http.get(reqUrl).success(function(data) {
      // after receiving the JSON data from the web-api call, set the start data of the model
      console.log("ei data received: items:" + data.length);
      //console.log("ei data= " + JSON.stringify(data));
      $scope.eventList = data;
    });
  };

  $http.get('api/ei').success(function(data) {
    // after receiving the JSON data from the web-api call, set the start data of the model
    console.log("ei list received: items:" + data.length);
    //console.log("data= " + JSON.stringify(data));
    $scope.releases = data;

  });

  $scope.mylink = '';

  $scope.myclick = function(data ) {
    console.log( "myclick " + data);
    $scope.mylink = data;
  }


}]);
