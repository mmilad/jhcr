var fs = require('fs'),
    bs = require('browser-sync').create(),
    assignments = require('./assignments.js');
exports.run = function (config) {
    var userArgs = config.userArgs,
        devDir = config.devDir
    if((userArgs[1] === "c") || (userArgs[1] === "component")) {
        var componentName = userArgs[2].split('/')[userArgs[2].split('/').length-1];
        if(userArgs[2]) {
            fs.mkdir(devDir+'/src/components/'+userArgs[2], function(err) {
                if(err) {
                    return console.log(err)
                }
                fs.writeFile(devDir+'/src/components/'+userArgs[2]+'/component.js', assignments.component(componentName), logError);
                fs.writeFile(devDir+'/src/components/'+userArgs[2]+'/style.js', assignments.jstyle(componentName), logError);
            });
        }
    }
    function logError(err) {
        if(err) {
            console.log(err)
        }
    }
}