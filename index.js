/**
 * author: zhong
 */

var postcss = require('postcss');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs-extra');
var assign = require("object-assign");
var node_modules_path = path.resolve(path.resolve(__dirname),'../');

module.exports = postcss.plugin('postcss-replace-path', function (options) {
    options = assign({
        deltaFile:   './react-deltaui/src/components/Delta/lib/variables.duss',
        path     :   '../..'
    }, options);
    var file = path.resolve(node_modules_path, options.deltaFile);

    function writeFile (content) {
        fs.outputFile(file, content, function (err) {
            console.log(chalk.green.bold('[postcss-replace-path-write失败信息] ') + err);
        });
    }
    function readFile () {
        return new Promise(function (resolve, reject){
            fs.readFile(file, 'utf8', function (err, data) {
                // console.log(chalk.green.bold('[readFile_data] ') + data);
                var _data = data.replace(/\"..\/..\/DeltaVariable/g, '"' + options.path + '/DeltaVariable');
                if(!err) {
                    resolve(_data);
                } else {
                    reject();                     
                }
            });
        });
    }
    readFile().then(function(data){
        writeFile(data);
    });
    return function (root, result) {};
});