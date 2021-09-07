const test = require('./test');
const ready = require('./readyness/ready');
const readyme = require('./readyness/readyme');
const unreadyme = require('./readyness/unreadyme');

const commands = { test,ready,readyme,unreadyme };

module.exports = async function (msg){
    let splits = msg.content.split(' ');
    let command = splits.shift();
    if (command.charAt(0) === '!'){
        command = command.substring(1).toUpperCase().toLowerCase();
        if (commands.hasOwnProperty(command) === true) {
            commands[command](msg,splits);
        } else {
            msg.reply('The Command "' + command + '" does not exist.');
        }

    }
}