const test = require('./test');
//const ready = require('ready');

const commands = { test };

module.exports = async function (msg){
    let splits = msg.content.split(' ');
    let command = splits.shift();
    if (command.charAt(0) === '!'){
        command = command.substring(1).toUpperCase().toLowerCase();
        //console.log(command);
        commands[command](msg,splits);

    }
}