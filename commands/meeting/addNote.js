const fs = require('fs')
const hasJSON = require("../../helpfunctions/hasJSON");

module.exports = function (msg, splits) {
    const hasJSON = require('../../helpfunctions/hasJSON');

    const customers_JSON = fs.readFileSync('data/customers/customersJSON.json');
    const customers = JSON.parse(customers_JSON)

    console.log(splits)

    function finished(err) {
        console.log("Writing done!");
    }

    if (splits.length > 0) {
        if (splits.length > 1) {
            const customer_id = splits[0];
            console.log(customer_id)
            //get users JSON
            if (hasJSON(customer_id) === true) {
                const customer_JSON = fs.readFileSync(`data/customers/${customer_id}.json`)
                const customer = JSON.parse(customer_JSON);

                //console.log("Problem is: " + customer.problem)

                const new_note = splits.slice(1).join(' ');

                customer["notes"].push(new_note);

                let new_customer_JSON = JSON.stringify(customer);
                fs.writeFileSync(`data/customers/${customer_id}.json`, new_customer_JSON, finished)

            } else {
                msg.reply("This customer doesn't exist")
            }
        } else {
            msg.reply("Please enter the note like this: '!addNote USER_ID This is the note to be added!'")
        }

    } else {
        msg.reply("Please enter the corresponding userID like this '!addNote USER_ID This is the note to be added'")
    }
}