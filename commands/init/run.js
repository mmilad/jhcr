var fs = require('fs');
exports.run = function(config) {
    devDir = config.devDir;
    fs.mkdir(devDir, function (err) {
        fs.mkdir(devDir+'/src', function (err) {
            fs.readFile(config.jhcrPath+'dist/jhcr.js', 'utf8', function(err, data) {
                if (err) {
                    console.log(err)
                };
                fs.writeFile(devDir+'/jhcr.js', data, logError);
            });
            fs.writeFile(devDir+'/build.html', INDEX, logError);
            fs.mkdir(devDir+'/src/assets', logError);
            fs.mkdir(devDir+'/src/js', logError);
            fs.mkdir(devDir+'/src/css', logError);
            fs.mkdir(devDir+'/src/components', function(err) {
                fs.mkdir(devDir+'/src/components/main', function(err) {
                    fs.writeFile(devDir+'/src/components/main/component.js', BASIC_COMPONENT, logError);
                    fs.writeFile(devDir+'/src/components/main/style.js', BASIC_STYLE, logError);
                });
            });
        });
    });
    console.log("initializing")
    // init end

    function logError(err) {
        if(err) {
            console.log(err)
        }
    }
}

var INDEX = 
`<html>
    <head>
        <script src="./src/build.js"></script>
    </head>
    <body><main></main></body>
</html>`;

var BASIC_COMPONENT = `
/*registering main-tag behavior*/
J.registry["main"] = {
    onSet: function (elem) {
        elem.innerHTML = "Hello World!";
    }
};`;
var BASIC_STYLE = `
/*registering main-tag style*/
J.C({
    main: {
        border: "1px solid black",
        "border-radius": "5px",
        "background-color": "#f1f1f1",
        children: {
            ".foo": {
                padding: "20px",
                children: {
                    p: {
                        "font-weight": "bold",
                        "font-size": "24px",
                        color: "green"
                    }
                }
            }
        }
    }
});`;