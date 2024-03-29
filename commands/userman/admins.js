//This function displays all the registered admins

const fs = require('fs');

const Discord = require('discord.js')
const {MessageEmbed} = require("discord.js");

const isOwner = require('../../helpfunctions/isOwner');
const isAdmin = require('../../helpfunctions/isAdmin');

module.exports = function (msg, splits) {
    const adminsJSON = fs.readFileSync('data/admins.json');
    const admins = JSON.parse(adminsJSON);

    //checks if the sender is and Admin or an Owner
    if ((isAdmin(msg.author.id)[0] === true) || (isOwner(msg.author.id)[0] === true)) {
        //creates a MessageEmbed
        const user_embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Logged-in Users')


        if (admins["admins"].length > 0) {
            for (let i = 0; i < admins["admins"].length; i++) {

                user_embed.addFields(
                    {name: "Name:   " +  admins["admins"][i].user_name, value: "ID:   " + admins["admins"][i].user_id}
                )
            }
        } else {
            user_embed.setDescription("No users are registered as admins.");
        }
        //sends the MessageEmbed
        msg.reply({embeds: [user_embed]}).catch(console.error);
    } else {
        msg.reply("You do not have the permissions to use this command! You need to be an admin!").catch(console.error);
    }

}