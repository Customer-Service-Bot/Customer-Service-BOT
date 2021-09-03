//console.log("Hello!");

require('dotenv').config();

const Discord = require('discord.js'); //Import of the Discord.js-Library

const intents = new Discord.Intents(32767);

const client = new Discord.Client({intents}); //Creating a Discord-Object


client.login('ODgyNjQxNzMzMjc4NjQ2MzQy.YS-WKw.80ItqXnTz9MuOn8ig04bFV1aM80'); //Login with the bots token

client.on('ready', readyDiscord);

//Ready Check for the Bot, Throws error if connection could not be established
function readyDiscord(){
    console.log("I'm ready");
}

//Function call for an incoming message
client.on('messageCreate', message);

function message(msg){
    if (msg.content === 'Hello Bot' && msg.channel.id === '882996171499503657'){
        msg.channel.send('Hello ' + msg.author.username)
    }

}