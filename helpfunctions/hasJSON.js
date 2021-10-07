//Checks if the given user-id already has a JSON-file, returns a boolean-value

const fs = require('fs');

module.exports = function (id) {

    const path = './data/customers/' + id + '.json';

    return fs.existsSync(path);
}