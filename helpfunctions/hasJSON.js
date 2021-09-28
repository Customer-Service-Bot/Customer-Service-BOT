const fs = require('fs');

module.exports = function (id) {

    const path = './data/customers/' + id + '.json';

    return fs.existsSync(path);
}