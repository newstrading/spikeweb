/**
 * Load and parse Bloomberg csv file
 */
var utils = require('../utils');
var csvParser = require('../csv-parser');

/**
 * Parse received 'raw' data
 *
 * @param data array of rows
 * @returns {Array} array of Bloomberg data rows
 */
function parseData(data) {
    var recArr = [];
    if (data.length > 1) {
        // Date,Time,EIID,Name,Importance,# Surveys,Low,High,Median,Avg
        for (var i = 1; i < data.length; i++) {
            var row = data[i];
            var rec = {};
            rec.date = row[0];
            rec.time = row[1];
            rec.eiid = utils.tryParseNumber(row[2]);
            rec.name = row[3];
            rec.importance = utils.tryParseNumber(row[4]);
            rec.surveys = utils.tryParseNumber(row[5]);
            rec.low = utils.tryParseNumber(row[6]);
            rec.high = utils.tryParseNumber(row[7]);
            rec.median = utils.tryParseNumber(row[8]);
            rec.avg = utils.tryParseNumber(row[9]);
            recArr.push(rec);
        }
    }
    return recArr;
}

/**
 * Load Bloomberg surveys from csv file
 *
 * @param fileName csv file to parse
 * @param delimiter csv delimiter
 * @returns {*|Promise}
 */
function loadBloombergData(fileName, delimiter) {
    return csvParser.parseCsv(fileName, delimiter, parseData);
}

module.exports.loadBloombergData = loadBloombergData;
