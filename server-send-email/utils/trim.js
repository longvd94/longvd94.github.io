const isString = require('./isString');

function trim(value) {
    if (!value || !isString(value)) {
        return value;
    }
    return value.replace(/^\s+|\s+$/gm,'');
}

module.exports = trim;