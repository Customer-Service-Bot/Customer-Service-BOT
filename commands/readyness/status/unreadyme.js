const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");

const isOwner = require('../../../help_functions/isOwner');
const isAdmin = require('../../../help_functions/isAdmin');
const isOnline = require('../../../help_functions/isOnline');
const isReady = require('../../../help_functions/isReady');


module.exports = function (msg, splits) {
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    console.log(onliners);

    function finished(err) {
        console.log("Status to ready!");
        msg.reply("You have been set to ready!");
    }

    let user_id = msg.author.id;


    if (isAdmin(user_id)[0] === true) {
        if (isOnline(user_id)[0] === true) {
            if (isReady(user_id)[0] === false) {

                console.log("User is already set to BUSY");
                msg.reply("You can not be set to 'busy' - You are already set to 'busy'");
            }
            if (isReady(user_id)[0] === true) {

                for (let i = 0; i < onliners["onliners"].length; i++) {
                    if (onliners["onliners"][i].user_id === user_id) {
                        onliners["onliners"][i].status = "BUSY";
                        let onliners_JSON = JSON.stringify(onliners);
                        fs.writeFile('data/onliners.json', onliners_JSON, finished);
                        break;
                    }
                }


            }
        } else {
            msg.reply("Cannot set you to 'Ready' - You are not logged in yet! Type '!onlineme' to do so.");
        }
    } else {
        msg.reply("Cannot set you to 'Ready' - You are not a registered admin!");
    }

}