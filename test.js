
var data = require('./data');



data.loadDataEiid(103, function (data) {
  console.log("test data: " + data);
});

console.log ("test EI LIST: " + data.releases);
