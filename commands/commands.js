const test = require('./test');
const admins = require('./userman/admins');

const findoldestcustomer = require('../helpfunctions/findOldestCustomer');
//const randomizecustomer = require('../helpfunctions/randomizeCustomer');


const readyme = require('./readyness/status/readyme');
const unreadyme = require('./readyness/status/unreadyme');

//const time = require('../helpfunctions/toTimeAndDate');

const online = require('./readyness/online');
const onlineme = require('./readyness/onlineme');
const unonlineme = require('./readyness/unonlineme');
const register = require('./userman/register');
const unregister = require('./userman/unregister');

const next = require('./meeting/next');

const commands = {admins, test, next, findoldestcustomer ,readyme, unreadyme, online, onlineme, unonlineme, register, unregister };

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