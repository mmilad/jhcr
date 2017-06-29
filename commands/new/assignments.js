
exports.component = function(name) {
    return `
J.registry["`+name+`"] = {
    onSet: function (elem) {
        elem.innerHTML = "Hello I am `+name+`!";
    }
};`
}

exports.jstyle = function(name) {
    return `
    J.C(
        {"`+name+`": {

        }
    });`
}
