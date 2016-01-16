var config = require('config');
var appConfig = config.get('App');

var csv = require('csv-parser')
var fs = require('fs')
var moment = require('moment');

var releases = [{
    EIId: 103,
    Name: "AU Australia CPI"
  }, {
    EIId: 999,
    Name: "ZZ Test Data"
  }, {
    EIId: 888,
    Name: "YY Test Data"
  }, {
    EIId: 777,
    Name: "XX Test Data"
  }, {
    EIId: 111,
    Name: "AA Test Data"
  }

];

var parseString = require('xml2js').parseString;

function xmlResult(err, result) {
  //console.log ("setting releases: " + JSON.stringify(result) );
  console.log("Number EI releases: " + result.EImaster.EI.length);
  releases = result.EImaster.EI;
}
var eiMasterFile = appConfig.data.dataFolder + "EImaster.xml";
fs.readFile(eiMasterFile, function(err, xml) {
  if (err) {
    console.log("EImaster.xml file  read error");
    throw err;
  } else {
    //console.log("file: " + xml);
    parseString(xml, xmlResult);
  }
});

var loadEIList = function() {

  var importantReleases = [];
  for (var i = 0, len = releases.length; i < len; i++) {
    var p = releases[i].importance;
    //console.log (p[0]);
    if ((p[0] === "3") || (p[0] === "2")) {
      importantReleases.push(releases[i]);
    }
  }
  console.log("important releases: " + importantReleases.length);

  return importantReleases;
  //return releases;
};

function tryParseNumber(str) {
  var s = str.trim(); //.replace(',', '.');
  s= s.replace(",", ".");
  return (isNaN(s) || s === '') ? s : parseFloat(s);
}

var loadDataEiid = function(eiid, result) {
  var data = [];
  var eiString = eiid + "";
  var analysisFile = appConfig.data.dataFolder + 'analysis.csv';
  fs.createReadStream(analysisFile)
    .pipe(csv({
      raw: false, // do not decode to utf-8 strings
      separator: ',', // specify optional cell separator
      quote: '"', // specify optional quote character
      escape: '"', // specify optional escape character (defaults to quote value)
      newline: '\n', // specify a newline character
      strict: true // require column length match headers length
    }))
    .on('data', function(row) {
      //console.log('row', row.symbol + " " + row.EIId);
      if (row.EIId === eiString) {
        //console.log('yeah.....');

        //console.log ("eventDate: " + row.EventDate);
        var dateB = moment(row.EventDate);
        var sDate = dateB.format("YYYYMMDD_HHmm");
        row.mylink = "/charts/spike_" + sDate + "_" + row.symbol + ".jpg";
        //console.log ("link: " + row.mylink);

        //console.log("spikePips: " + row.SpikePips );

        row.SpikePips = tryParseNumber(row.SpikePips);
        //        console.log(typeof(row.SpikePips));
        if (row.SpikePips) row.SpikePips = row.SpikePips.toFixed(2);

        data.push(row);
      }
    })
    .on('end', function() {
      //console.log('end');
      result(data);
    })
}

var loadHistory = function(eiid, result) {
    var data = [];
    var eiString = eiid + "";
    var historyFile = appConfig.data.dataFolder + 'history.csv';
    fs.createReadStream(historyFile)
      .pipe(csv({
        raw: false, // do not decode to utf-8 strings
        separator: ',', // specify optional cell separator
        quote: '"', // specify optional quote character
        escape: '"', // specify optional escape character (defaults to quote value)
        newline: '\n', // specify a newline character
        strict: true // require column length match headers length
      }))
  .on('data', function(row) {
    //console.log('row: ', row);
    //console.log (row.ReleaseID);
    if (row.ReleaseID === eiString) {
      data.push(row);
    }
  })
  .on('end', function() {
    //console.log('end');
    result(data);
  })
}


var loadDescriptive = function(eiid, result) {
    var data = {};
    var eiString = eiid + "";
    var releasesFile = appConfig.data.dataFolder +'releases.csv';
    fs.createReadStream(releasesFile)
      .pipe(csv({
        raw: false, // do not decode to utf-8 strings
        separator: ',', // specify optional cell separator
        quote: '"', // specify optional quote character
        escape: '"', // specify optional escape character (defaults to quote value)
        newline: '\n', // specify a newline character
        strict: true // require column length match headers length
      }))
  .on('data', function(row) {
    //console.log('row: ', row);
    //console.log (row.ReleaseID);
    if (row.EIId === eiString) {
      data = row;
    }
  })
  .on('end', function() {
    //console.log('end');
    result(data);
  })
}


module.exports.loadEIList = loadEIList;
module.exports.loadDataEiid = loadDataEiid;
module.exports.loadHistory = loadHistory;
module.exports.loadDescriptive = loadDescriptive;
