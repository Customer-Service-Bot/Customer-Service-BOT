//THis is the Main-File of the App, run it with 'node index'.

//It waits the events 'messageCreate','guildMemberAdd' and 'guildMemberRemove' and calls the according functions

require('dotenv').config();

const Discord = require('discord.js'); //Import of the Discord.js-Library
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents}); //Creating a Discord-Object
const newCustomer = require('./welcome');
const goodbye = require('./commands/goodbye');

//Logs In the bot with the TOKEN from .env
client.login(process.env.TOKEN); //Login with the bots token

//Calls 'readyDiscord' when the bot connects successfully
client.on('ready', readyDiscord);

//Calls 'newCustomer' when a new user connects to the Server
client.on('guildMemberAdd', (member) => {
    newCustomer(member);
});

//Calls 'goodbye' when a user leaves or gets kicked from the Server
client.on('guildMemberRemove', (member) => {
    goodbye(member);
});

//Ready Check for the Bot, Throws error if connection could not be established
function readyDiscord(){
    console.log("I'm ready");
}


//Function call for an incoming message
const comHandler = require('./commands/commands')
client.on('messageCreate', comHandler);


