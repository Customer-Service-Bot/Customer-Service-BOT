const Discord = require('discord.js');  //Import of the Discord.js-Library

const fs = require('fs');

const findoldestcustomer = require('../../helpfunctions/findOldestCustomer');
const findcustomerswaiting = require('../../helpfunctions/findCustomersWaiting');

const totimeanddate = require('../../helpfunctions/toTimeAndDate')

module.exports = function (msg, splits) {
    if (findcustomerswaiting(msg).length > 0) {

        const user_id = findoldestcustomer(msg);

        //Move in CustomersJSON

        const customersJSON = fs.readFileSync('data/customers/customersJSON.json');
        const customers = JSON.parse(customersJSON)

        function finished(err) {
            console.log("Status to ready!");
        }

        let joined = 0;
        for (let i = 0; i < customers["CustomersWaiting"].length; i) {
            if (customers["CustomersWaiting"][i].user_id === user_id) {
                let customerOBJ = customers["CustomersWaiting"][i];
                customers["CustomersWaiting"].splice(i, 1);
                customers["CustomersKnown"].push(customerOBJ);

                joined = customers["CustomersKnown"][i].joined;

                let customersJSON_new = JSON.stringify(customers)

                fs.writeFileSync('data/customers/customersJSON.json', customersJSON_new, finished);


            }
            i++;
        }

        //Change Role

        //memberOBJ retreival
        const member = msg.guild.members.cache.get(user_id);
        const server = msg.guild;

        let old_role = msg.guild.roles.cache.find(role => role.name === "Customer-Waiting");

        let new_role = msg.guild.roles.cache.find(role => role.name === "Customer");


        member.roles.remove(old_role).catch(console.error);
        member.roles.add(new_role).catch(console.error);

        //Reply to User who the next customer is and shows information

        let wait_time = totimeanddate(joined)
        msg.reply(`Your next User is ${member.user}. His ID is: ${member.user.id}. They have been waiting since ${wait_time}`).catch(console.error);

        //Make Text Channel (Commented because it`s not useful for privacy reasons)

        /*
        let t_channel_name = member.user.username;
        server.channels.create('Text for ' + t_channel_name, {
            reason: 'Text Channel for the support of' + t_channel_name,
            type: 'GUILD_TEXT',
            topic: 'Text Channel for the support of ' + t_channel_name,
        })
            .catch(console.error);
        */


        //Make Voice Channel
        let v_channel_name = member.user.username;
        let v_channel = member.guild.channels.cache.find(channel => channel.name === 'Voice  for ' + v_channel_name);
        if (v_channel === undefined) {

            server.channels.create('Voice  for ' + v_channel_name, {
                reason: 'Text Channel for the support of' + v_channel_name,
                type: 'GUILD_VOICE',
                topic: 'Voice Channel for the support of ' + v_channel_name,
            })
                .catch(console.error);
        } else {
        }
    } else {
        msg.reply("There are no customers waiting!").catch(console.error);
    }
}