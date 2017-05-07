fs = require('fs');
exports.run = function(config) {
    var FILESTRING="",
        DEST = config.dest,
        MINIFY = (config.minify);
    mergeFiles(config.targets);
    function readAndMerge(filePath, write) {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            FILESTRING += data;
            if(write) {
                if(MINIFY) {
                    FILESTRING = FILESTRING.replace(/(\r\n|\n|\r| )/gm,"");
                }
                fs.writeFile(DEST, FILESTRING,function(err) {
                    if(err) {
                        console.log(err)
                    }
                });
            }
        });
    }
    function mergeFiles(ary) {
        var i;
        for( i = 0;i<ary.length;i++) {
            readAndMerge(ary[i], (i<ary.length));
        }
    }
}