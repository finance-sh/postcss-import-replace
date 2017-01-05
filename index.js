/**
 * author: zhong
 */

var postcss = require('postcss');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs-extra');
var assign = require("object-assign");
var node_modules_path = path.resolve(path.resolve(__dirname),'../');

module.exports = postcss.plugin('postcss-import-replace', function (options) {

    options = assign({
        deltaFile:   './react-deltaui/src/components/Delta/lib/variables.duss',
        path     :   '../..'
    }, options);

    var file = path.resolve(node_modules_path, options.deltaFile);
    var flag = '/* end */';

    var writeFile = function (content) {
        fs.outputFile(file, content, function (err) {
            console.log(chalk.green.bold('[writeFile]') + err);
        });
    };

    var replaceFile = function(data) {
        var _data =  data.replace(/\"..\/..\/DeltaVariable/g, '"' + options.path + '/DeltaVariable');
        return flag.concat('\n' + _data);
    }

    var readFile = function () {
        var data = fs.readFileSync(file, 'utf8');
        var _data;
        if(data.indexOf(flag) >= 0) {
            return
        } else {        
            _data = replaceFile(data);
            writeFile(_data);
        }
    };

    readFile();

    return function (root, result) {};

});