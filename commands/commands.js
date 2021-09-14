const test = require('./test');
const admins = require('./readyness/admins');
const ready = require('./readyness/ready');
const readyme = require('./readyness/readyme');
const unreadyme = require('./readyness/unreadyme');
const register = require('./userman/register');
const unregister = require('./userman/unregister');

const commands = {admins, test, ready, readyme, unreadyme, register, unregister };

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