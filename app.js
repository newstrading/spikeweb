// external modules
var http = require('http');		// http server (without express framework)
var express = require('express');	// express framework (page routing)
var fs = require('fs');
var data = require('./data');

// express.js engine
var app = express();
app.use(express.static('public'));      // public static content
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//  extended: true
//}));
//app.use(express.urlencoded());
//app.use(express.json());      // if needed

app.get('/api/ei', function(req, res) {
  console.log("/api/ei get received");
  res.json(data.releases);
});

app.get('/api/data/:eiid', function(req, res) {
  var eiid = req.param("eiid")
  console.log("/api/data get received for eiid: " + eiid);
  data.loadDataEiid(eiid, function (data) {
      res.json(data);
  });
});


var port = 80;
var httpServer = http.createServer(app);
httpServer.listen(port);

console.log('demo .org starting on http-port: '  + port);
