const Discord = require('discord.js');  //Import of the Discord.js-Library

const fs = require('fs');

const findoldestcustomer = require('../../helpfunctions/findOldestCustomer');
const findcustomerswaiting = require('../../helpfunctions/findCustomersWaiting');

module.exports = function (msg, splits) {
    if (findcustomerswaiting(msg).length > 0) {

        const user_id = findoldestcustomer(msg);
        //Reply to User who the next customer is and shows information


        //Move in CustomersJSON

        const customersJSON = fs.readFileSync('data/customers/customersJSON.json');
        const customers = JSON.parse(customersJSON)

        function finished(err) {
            console.log("Status to ready!");
        }

        for (let i = 0; i < customers["CustomersWaiting"].length; i) {
            console.log(customers["CustomersWaiting"].length);
            if (customers["CustomersWaiting"][i].user_id === user_id) {
                let customerOBJ = customers["CustomersWaiting"][i];
                customers["CustomersWaiting"].splice(i, 1);
                customers["CustomersKnown"].push(customerOBJ);

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


        member.roles.remove(old_role);
        member.roles.add(new_role);

        //Make Text Channel

        let t_channel_name = member.user.username;
        server.channels.create('Text for ' + t_channel_name, {
            reason: 'Text Channel for the support of' + t_channel_name,
            type: 'GUILD_TEXT',
            topic: 'Text Channel for the support of ' + t_channel_name,
        })
            .catch(console.error);


        //Make Voice Channel

        //Move to Voice Channel

    } else {
        msg.reply("There are no customers waiting!");
    }
}