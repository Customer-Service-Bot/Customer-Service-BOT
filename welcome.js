const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
const hasJSON = require('./helpfunctions/hasJSON');
const constants = require("constants");

module.exports = function (member) {
    //console.log("New User")
    //console.log(member.id);
    member.send("Willkommen auf dem Server von 'Test-Company'.")

    function finished(err) {
        console.log("Status to ready!");
    }


    //Roll assignment
    let role = member.guild.roles.cache.find(role => role.name === "Customer-Waiting");
    member.roles.add(role);

    //Create Customer-JSON
    const customer = {};
    customer.user_id = member.user.id;
    customer.user_name = member.user.username;
    customer.joined = member.joinedTimestamp;
    customer.problem = "";

    //Create Customers JSON
    if (hasJSON(member.user.id) === false) {
        const single_customer_JSON = JSON.stringify(customer);
        fs.writeFileSync('data/customers/' + member.user.id + '.json', single_customer_JSON, finished);
    }

    //Add to CustomersJSON
    const general_customer = {};
    general_customer.user_id = member.user.id;
    general_customer.user_name = member.user.username;
    general_customer.joined = member.joinedTimestamp;

    const customersJSON = fs.readFileSync('data/customers/customersJSON.json');

    const general_customer_JSON = JSON.parse(customersJSON);
    general_customer_JSON["CustomersWaiting"].push(general_customer);

    const new_customersJSON = JSON.stringify(general_customer_JSON)
    fs.writeFileSync('./data/customers/customersJSON.json', new_customersJSON, finished);

}