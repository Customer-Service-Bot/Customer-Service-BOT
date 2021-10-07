//updates the problem in the customers file

const fs = require('fs')

module.exports = function (msg, splits) {
    const hasJSON = require('../../helpfunctions/hasJSON');

    const customers_JSON = fs.readFileSync('data/customers/customersJSON.json');
    const customers = JSON.parse(customers_JSON)

    function finished(err) {
        console.log("Writing done!");
    }

    //Checks if the right arguments were given
    if (splits.length > 0) {
        if (splits.length > 1) {
            const customer_id = splits[0];

            //get users JSON

            //checks if customer has JSON-file
            if (hasJSON(customer_id) === true) {
                const customer_JSON = fs.readFileSync(`data/customers/${customer_id}.json`)
                const customer = JSON.parse(customer_JSON);

                //defines the problem from the message
                customer.problem = splits.slice(1).join(' ');

                let new_customer_JSON = JSON.stringify(customer);
                fs.writeFileSync(`data/customers/${customer_id}.json`, new_customer_JSON, finished)

            } else {
                msg.reply("This customer doesn't exist").catch(console.error);
            }
        } else {
            msg.reply("Please enter the problem like this: '!addProblem USER_ID PROBLEM PROBLEM PROBLEM'").catch(console.error);
        }

    } else {
        msg.reply("Please enter the corresponding userID after '!addProblem '").catch(console.error);
    }
}