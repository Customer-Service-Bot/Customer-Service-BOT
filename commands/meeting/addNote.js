//This file adds a note to the users file

const fs = require('fs')
const hasJSON = require("../../helpfunctions/hasJSON");

module.exports = function (msg, splits) {
    const hasJSON = require('../../helpfunctions/hasJSON');

    console.log(splits)

    function finished(err) {
        console.log("Writing done!");
    }

    //checks if the right arguments were given
    if (splits.length > 0) {
        if (splits.length > 1) {
            const customer_id = splits[0];


            //get users JSON

            //checks if the customer has a JSON
            if (hasJSON(customer_id) === true) {
                const customer_JSON = fs.readFileSync(`data/customers/${customer_id}.json`)
                const customer = JSON.parse(customer_JSON);

                //defines the note to be added
                const new_note = splits.slice(1).join(' ');

                //adds note to the file
                customer["notes"].push(new_note);

                let new_customer_JSON = JSON.stringify(customer);
                fs.writeFileSync(`data/customers/${customer_id}.json`, new_customer_JSON, finished)

            } else {
                msg.reply("This customer doesn't exist").catch(console.error);
            }
        } else {
            msg.reply("Please enter the note like this: '!addNote USER_ID This is the note to be added!'").catch(console.error);
        }

    } else {
        msg.reply("Please enter the corresponding userID like this '!addNote USER_ID This is the note to be added'").catch(console.error);
    }
}