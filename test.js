
var data = require('./db');

//console.log("history test..");
//data.loadHistory(1450, function (data) {
//  console.log("history data: " + data);
//  console.log("history data rows: " + data.length);
//});


//console.log("descriptive test..");
//data.loadDescriptive(1708, function (data) {/
//  console.log("desciptive data: " + JSON.stringify(data));
//});


 data.loadDataEiid(1339, function (data) {
   console.log("load data: " + data);
 });
console.log ("test EI LIST: " + data.releases);
