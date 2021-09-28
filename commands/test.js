const fs = require("fs");

module.exports = function (msg, splits) {
    if (splits.length > 0) {
        let user_id = splits[0];
        const user_JSON = fs.readFileSync('./data/customers/' + user_id + '.json');
        const user = JSON.parse(user_JSON);
        msg.reply("Name is:   " + user.user_name).catch(console.error)
    } else {
        msg.reply('Hello ' + msg.author.username).catch(console.error);
    }
}