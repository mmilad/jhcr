var fs = require('fs'),
    bs = require('browser-sync').create(),
    testIndex = "";
exports.run = function (config) {
    testIndex = require(config.jhcrPath+'/commands/run/initializer.js')
    fs.writeFile(config.devDir+'/index.html', testIndex.run(config), function(e) {
        if(e) {
            console.log(e)
        }
        bs.init({
            server: config.devDir+'/'
        });
        bs.watch(config.devDir+'/').on("change", function(changedFile) {
            fs.writeFile(config.devDir+'/index.html', testIndex.run(config), function(err) {
                if(err) {
                    console.log(err)
                }
                bs.reload()
            });
        });
    });
}