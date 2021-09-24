const fs = require('fs')
const Discord = require('discord.js');  //Import of the Discord.js-Library
const hasJSON = require('../helpfunctions/hasJSON');

module.exports = function (member) {

    const user_id = member.user.id;

    const customers_JSON = fs.readFileSync('data/customers/customersJSON.json')
    const customers = JSON.parse(customers_JSON);

    //Delete customers JSON file
    if (hasJSON(member.user.id) === true) {
        const path = './data/customers/' + user_id + '.json';
        fs.unlinkSync(path);
    }

    //Remove from customerJSON
    function finished(err) {
        console.log("CustomersJSON ready!");
    }

    for (let i = 0; i < customers["CustomersWaiting"].length; i++) {
        console.log(customers["CustomersWaiting"].length);
        if (customers["CustomersWaiting"][i].user_id === user_id) {
            customers["CustomersWaiting"].splice(i, 1);
            let new_customers_JSON = JSON.stringify(customers);
            fs.writeFile('data/customers/customersJSON.json', new_customers_JSON, finished);
        }
    }

    for (let i = 0; i < customers["CustomersKnown"].length; i++) {
        console.log(customers["CustomersKnown"].length);
        if (customers["CustomersKnown"][i].user_id === user_id) {
            customers["CustomersKnown"].splice(i, 1);
            let new_customers_JSON = JSON.stringify(customers);
            fs.writeFile('data/customers/customersJSON.json', new_customers_JSON, finished);
        }
    }
}