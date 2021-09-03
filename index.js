//console.log("Hello!");

require('dotenv').config();

const Discord = require('discord.js'); //Import of the Discord.js-Library

const intents = new Discord.Intents(32767);

const client = new Discord.Client({intents}); //Creating a Discord-Object


client.login(process.env.TOKEN); //Login with the bots token

client.on('ready', readyDiscord);

//Ready Check for the Bot, Throws error if connection could not be established
function readyDiscord(){
    console.log("I'm ready");
}

//Function call for an incoming message
const comHandler = require('./commands/commands')
client.on('messageCreate', comHandler);
