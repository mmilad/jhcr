#! /usr/bin/env node
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
//var jhcrPath = process.argv[1].replace('index.js','').replace(/\\/g,'/');
var jhcrPath = path.dirname(fs.realpathSync(__filename));
var projectPath = path.dirname(__filename);
var userArgs = process.argv.slice(2);
var devDir = "dev";
if(projectPath.charAt(projectPath.length) !== "/") {
projectPath = projectPath+"/"
}
if(jhcrPath.charAt(jhcrPath.length) !== "/") {
    jhcrPath = jhcrPath+"/"
}
if (fs.existsSync(projectPath+'/commands/'+userArgs[0]+'/run.js')) {
    var init = require(projectPath+'/commands/'+userArgs[0]+'/run.js');
    init.run({
        jhcrPath: jhcrPath,
        devDir:devDir,
        userArgs: userArgs
    });
} else if (userArgs[0] === "-v") {
    var config = require("./package.json")
    console.log(config.version)
} else {
    console.log("command not found")
}