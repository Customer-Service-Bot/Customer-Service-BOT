//Returns a Hello as an answer to the message.

const fs = require("fs");

module.exports = function (msg, splits) {
        msg.reply('Hello ' + msg.author.username).catch(console.error);

}