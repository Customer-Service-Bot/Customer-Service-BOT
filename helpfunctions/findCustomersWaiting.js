//Searches the Server for all users with the role 'Customer-Waiting' and returns the in an array

const Discord = require('discord.js');  //Import of the Discord.js-Library

module.exports = function (msg, splits){
    return msg.guild.roles.cache.find(role => role.name === "Customer-Waiting").members.map(m => m.user.id);
}