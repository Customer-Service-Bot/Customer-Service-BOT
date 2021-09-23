const findCustomersWaiting = require('./findCustomersWaiting')
const fs = require("fs");

module.exports = function (msg, splits) {
    const amount = findCustomersWaiting(msg).length;
    const customer_ids = findCustomersWaiting(msg);

    const customers_JSON = fs.readFileSync('./data/customers/customersJSON.json');
    const customers = JSON.parse(customers_JSON);

    let next = 0;

    for (let i = 0; i <= amount; i++) {
        if (next === 0 || next > customers["CustomersWaiting"][i].joined) {
            next = customers["CustomersWaiting"][i].joined;
        }
    }
    return next;
}