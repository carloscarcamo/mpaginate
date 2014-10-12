exports.mpaginate = function (schema) {
    schema.statics.findAndPaginate = require('./mpaginate.js');
}
