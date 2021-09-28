const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
const hasJSON = require('./helpfunctions/hasJSON');
const constants = require("constants");
const findReady = require("./helpfunctions/findReady");

module.exports = function (member) {
    const findOnliners = require('./helpfunctions/findOnliners');
    const findReady = require('./helpfunctions/findReady')

    //check for Onliners
    console.log(findOnliners())

    if (findOnliners()[0] === true) {
        //check for Readyness
        if (findReady()[0] === true) {
            member.send(`Welcome to the support Server of the Test-Company. ${findReady()[1]} Support-Agents are currently ready to support you. You will soon receive a private message so keep an eye on your messages on the left side.`);
        } else if (findReady()[0] === false){
            member.send(`Welcome to the support Server of the Test-Company. There are currently no Support-Agents ready to support you. Please have patience. You will receive a private message as soon as someone is ready for you so keep an eye on your messages on the left side.`);
        }

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
        customer.notes = [];

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


    } else {

        async function kick_user(member){
            await member.user.send("There are currently no agents online for support. You will not be able to join the support server at this time. Please try to join again within the opening times!")
                .catch(console.error)
            await member.guild.members.kick(member, "Test")
                .catch(console.error)
        }
        kick_user(member)
    }
}