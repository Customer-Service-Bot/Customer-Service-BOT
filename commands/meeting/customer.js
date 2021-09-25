const fs = require('fs')
const hasJSON = require("../../helpfunctions/hasJSON");
const {MessageEmbed} = require("discord.js");

module.exports = function (msg, splits) {


    const hasJSON = require('../../helpfunctions/hasJSON');
    const toTimeAndDate = require('../../helpfunctions/toTimeAndDate')

    if (splits.length > 0) {
        const customer_id = splits[0];


        //get users JSON
        if (hasJSON(customer_id) === true) {

            const customer_JSON = fs.readFileSync(`data/customers/${customer_id}.json`)
            const customer = JSON.parse(customer_JSON);

            const customer_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Customer Information')
                .addFields({name: 'Name', value: customer.user_name},
                    {name: 'ID', value: String(customer.user_id)},
                    {name: "Joined", value: toTimeAndDate(customer.joined)},
                    {name: "Problem", value: customer.problem},
                    {name: "NOTES", value: "-----------------"},
                    {name: '\u200B', value: '\u200B'})
            for (let i = 0; i < customer["notes"].length; i++) {
                customer_embed.addFields(
                    {name: "Note " + i, value: customer["notes"][i]}
                )
            }

            async function send_embed(msg, customer_embed) {
                await msg.author.send({ embeds: [customer_embed] });
            }
            send_embed(msg,customer_embed).catch(console.error);

        } else {
            msg.reply("This customer doesn't exist")
        }

    } else {
        msg.reply("Please enter the corresponding userID like this '!addNote USER_ID This is the note to be added'")
    }
}