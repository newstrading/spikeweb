/**
 * Created by eugene on 8/14/15.
 */

function checkFullPath(rootPath, p, pathSeparator) {
    var pathSep = pathSeparator || '/';
    return p.indexOf(pathSep) !== 0 ? rootPath + pathSep + p : p;
}

function tryParseNumber(str) {
    var s = str.trim();//.replace(',', '.');
    return (isNaN(s) || s === '') ? s : parseFloat(s);
}

module.exports.checkFullPath = checkFullPath;
module.exports.tryParseNumber = tryParseNumber;