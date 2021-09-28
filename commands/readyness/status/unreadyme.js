const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");

const isOwner = require('../../../helpfunctions/isOwner');
const isAdmin = require('../../../helpfunctions/isAdmin');
const isOnline = require('../../../helpfunctions/isOnline');
const isReady = require('../../../helpfunctions/isReady');


module.exports = function (msg, splits) {
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    function finished(err) {
        console.log("Status to ready!");
    }

    let user_id = msg.author.id;


    if (isAdmin(user_id)[0] === true) {
        if (isOnline(user_id)[0] === true) {
            if (isReady(user_id)[0] === false) {

                msg.reply("You can not be set to 'busy' - You are already set to 'busy'");
            }
            if (isReady(user_id)[0] === true) {

                for (let i = 0; i < onliners["onliners"].length; i++) {
                    if (onliners["onliners"][i].user_id === user_id) {
                        onliners["onliners"][i].status = "BUSY";
                        let onliners_JSON = JSON.stringify(onliners);
                        fs.writeFile('data/onliners.json', onliners_JSON, finished);
                        msg.reply("You have been set to busy!").catch(console.error);
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