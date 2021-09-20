const test = require('./test');
const admins = require('./readyness/admins');

const readyme = require('./readyness/status/readyme');

const online = require('./readyness/online');
const onlineme = require('./readyness/onlineme');
const unonlineme = require('./readyness/unonlineme');
const register = require('./userman/register');
const unregister = require('./userman/unregister');

const commands = {admins, test, readyme, online, onlineme, unonlineme, register, unregister };

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