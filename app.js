// external modules
var config = require('config');
var appConfig = config.get('App');
var http = require('http');		// http server (without express framework)
var express = require('express');	// express framework (page routing)
var fs = require('fs');
var data = require('./db');

// express.js engine
var app = express();
app.use(express.static('public'));      // public static content
app.use('/charts', express.static( appConfig.data.dataFolder + "charts" ));
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//  extended: true
//}));
//app.use(express.urlencoded());
//app.use(express.json());      // if needed

app.get('/', function(req, res){
  res.sendfile('./public/default.html');
});


app.get('/api/ei', function(req, res) {
  console.log("/api/ei get received");
  res.json( data.loadEIList() );
});

app.get('/api/data/:eiid', function(req, res) {
  var eiid = req.param("eiid")
  console.log("/api/data get received for eiid: " + eiid);
  data.loadDataEiid(eiid, function (data) {
      res.json(data);
  });
});

app.get('/api/history/:eiid', function(req, res) {
  var eiid = req.param("eiid")
  console.log("/api/history get received for eiid: " + eiid);
  data.loadHistory(eiid, function (data) {
      res.json(data);
  });
});



app.get('/api/desc/:eiid', function(req, res) {
  var eiid = req.param("eiid")
  console.log("/api/desc get received for eiid: " + eiid);
  data.loadDescriptive(eiid, function (data) {
      res.json(data);
  });
});



var httpServer = http.createServer(app);
httpServer.listen(appConfig.server.port);

console.log('demo .org starting on http-port: '  + appConfig.server.port);
