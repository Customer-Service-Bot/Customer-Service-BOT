
const Discord = require('discord.js');  //Import of the Discord.js-Library


module.exports = function (msg, splits){
    //console.log(msg.guild.members.cache.find(member => member.role === "Customer-Waiting"));
    //console.log(customers_waiting);
    return msg.guild.roles.cache.find(role => role.name === "Customer-Waiting").members.map(m => m.user.id);
}