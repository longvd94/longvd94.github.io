const isNumber = require('./isNumber');

function randomKey(keyLength = 7) {
    const startIndex = 2;

    if (!keyLength || !isNumber(keyLength)) {
        throw Error('keyLength is number and greater than 0');
    }

    const endIndex = Math.min(startIndex + keyLength, 20);
    return Math.random().toString(36).substr(startIndex, endIndex);
}

module.exports = randomKey;