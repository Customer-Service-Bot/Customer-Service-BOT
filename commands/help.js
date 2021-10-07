//Gives out all commands listed in commands.json in a MessageEmbed

const fs = require('fs');
const {MessageEmbed} = require("discord.js");

module.exports = function (msg,splits){

    function finished(err){
        console.log("Writing Successful")
    }

    let commands_JSON = fs.readFileSync('./data/commands.json');
    let commands = JSON.parse(commands_JSON);
    //Creating a MessageEmbed
    const commands_embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commands')
    //Loop to add every command in commands.json
    for (let i = 0; i < commands["commands"].length; i++) {
        commands_embed.addFields(
            {name: commands["commands"][i].description, value: "```" + commands["commands"][i].syntax + "```"}
        )
    }

    msg.author.send({ embeds: [commands_embed] }).catch(console.error);
}