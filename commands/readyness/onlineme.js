const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");

const isOwner = require('../../helpfunctions/isOwner');
const isAdmin = require('../../helpfunctions/isAdmin');
const isOnline = require('../../helpfunctions/isOnline');
const isReady = require('../../helpfunctions/isReady');

module.exports = function (msg, splits) {
    const onlinersJSON = fs.readFileSync('data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    function finished(err) {
        console.log("Onliners Ready!");
        msg.reply("You have been logged in!").catch(console.error);
    }

    const timestamp = Date.now();
    let user_id = msg.author.id;
    let user_name = msg.author.username;
    let user_obj = new Object();
    user_obj.user_name = user_name;
    user_obj.user_id = user_id;
    user_obj.timestamp = timestamp;
    user_obj.status = "READY";

    if (isAdmin(user_id)[0] === true) {
        if (onliners["onliners"].length !== 0) {
            for (let i = 0; i < onliners["onliners"].length; i++) {

                if (onliners["onliners"][i].user_id === user_id) {
                    msg.reply("Cannot log you in - You are already logged in!").catch(console.error);
                    break;
                }
                if (i === onliners["onliners"].length - 1) {
                    onliners["onliners"].push(user_obj);
                    let onliners_JSON = JSON.stringify(onliners);
                    fs.writeFile('data/onliners.json', onliners_JSON, finished);
                    break;
                }
            }
        } else {
            onliners["onliners"].push(user_obj);
            let onliners_JSON = JSON.stringify(onliners);
            fs.writeFile('data/onliners.json', onliners_JSON, finished);
        }
    } else {
        msg.reply("Cannot log you in - You are not a registered admin!").catch(console.error);
    }
}