require('dotenv').config();

const test = require('./test');
const help = require('./help')
const admins = require('./userman/admins');

const findoldestcustomer = require('../helpfunctions/findOldestCustomer');

const readyme = require('./readyness/status/readyme');
const unreadyme = require('./readyness/status/unreadyme');

const online = require('./readyness/online');
const onlineme = require('./readyness/onlineme');
const unonlineme = require('./readyness/unonlineme');
const register = require('./userman/register');
const unregister = require('./userman/unregister');

const next = require('./meeting/next');
const addproblem = require('./meeting/addproblem');
const addnote = require('./meeting/addNote')
const customer = require('./meeting/customer')

const commands = {
    admins,
    test,
    help,
    next,
    addproblem,
    addnote,
    customer,
    findoldestcustomer,
    readyme,
    unreadyme,
    online,
    onlineme,
    unonlineme,
    register,
    unregister
};

module.exports = async function (msg) {

    let splits = msg.content.split(' ');
    let command = splits.shift();
    if (command.charAt(0) === '!') {
        command = command.substring(1).toUpperCase().toLowerCase();
        if (commands.hasOwnProperty(command) === true) {
            if (msg.channel.id === process.env.BOTCHANNEL) {
                commands[command](msg, splits);
            } else {
                await msg.author.send("Please only use commands in the channel for Bot-Messages").catch(console.error);
                await msg.delete().catch(console.error);
            }
        } else {
            msg.reply('The Command "' + command + '" does not exist.').catch(console.error);
        }
    }
}