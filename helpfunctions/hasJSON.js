const fs = require('fs');

module.exports = function (id) {

    const path = './data/customers/' + id + '.json';

    if (fs.existsSync(path)) {
        console.log("File Exists");
        return true;
    } else {
        console.log("File Doesn't Exist");
        return false;
    }
}