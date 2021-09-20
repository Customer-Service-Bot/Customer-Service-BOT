const fs = require('fs');

const Discord = require('discord.js')
const {MessageEmbed} = require("discord.js");

const isOwner = require('../../help_functions/isOwner');
const isAdmin = require('../../help_functions/isAdmin');

module.exports = function (msg, splits) {
    const adminsJSON = fs.readFileSync('data/admins.json');
    const admins = JSON.parse(adminsJSON);

    if ((isAdmin(msg.author.id)[0] === true) || (isOwner(msg.author.id)[0] === true)) {
        const user_embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Logged-in Users')


        if (admins["admins"].length > 0) {
            for (let i = 0; i < admins["admins"].length; i++) {

                let user_id = msg.guild.members.cache.get(admins["admins"][i].user_id);
                user_embed.addFields(
                    {name: "Name:   " + user_id.user.username, value: "ID:   " + admins["admins"][i].user_id}
                )
            }
        } else {
            user_embed.setDescription("No users are registered as admins.");
        }
        msg.reply({embeds: [user_embed]});
    } else {
        msg.reply("You do not have the permissions to use this command! You need to be an admin!");
    }

}