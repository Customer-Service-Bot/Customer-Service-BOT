//Sets the status of a logged-in Admins to 'READY'

const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library

const isOwner = require('../../../helpfunctions/isOwner');
const isAdmin = require('../../../helpfunctions/isAdmin');
const isOnline = require('../../../helpfunctions/isOnline');
const isReady = require('../../../helpfunctions/isReady');


module.exports = function (msg, splits) {
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    console.log(onliners);

    function finished(err) {
        console.log("Status to ready!");
        msg.reply("You have been set to ready!").catch(console.error);
    }

    let user_id = msg.author.id;

    //checks if the sender is an Admin, is logged-in and if they are 'READY'
    if (isAdmin(user_id)[0] === true) {
        if (isOnline(user_id)[0] === true) {
            //checks if the status is already 'READY'
            if (isReady(user_id)[0] === true) {

                msg.reply("You can not be set to 'ready' - You are already set to 'ready'");
            }
            //sets the status to 'READY'
            if (isReady(user_id)[0] === false) {

                for (let i = 0; i < onliners["onliners"].length; i++) {
                    if (onliners["onliners"][i].user_id === user_id) {
                        onliners["onliners"][i].status = "READY";
                        let onliners_JSON = JSON.stringify(onliners);
                        fs.writeFile('data/onliners.json', onliners_JSON, finished);
                        break;
                    }
                }
            }
        } else {
            msg.reply("Cannot set you to 'Ready' - You are not logged in yet! Type '!onlineme' to do so.").catch(console.error);
        }
    } else {
        msg.reply("Cannot set you to 'Ready' - You are not a registered admin!").catch(console.error);
    }

}