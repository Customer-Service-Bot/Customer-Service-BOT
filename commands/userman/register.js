const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");
const isOwner = require('../../helpfunctions/isOwner');

module.exports = function (msg, splits) {

    const adminsJSON = fs.readFileSync('data/admins.json');
    const admins = JSON.parse(adminsJSON);

    function finished(err) {
        console.log("Admins Ready!");
        msg.reply("ID registered!").catch(console.error);
    }

    if (splits.length > 0) {

        if (splits.length > 1) {

            if (Number.isNaN(splits[0]) === true){
                msg.reply("The first argument needs to be an ID (18 Digit Number). Please enter the command like this: ```!register USER-ID NAME```")
                return;
            }

            let user_id = splits[0];
            let user_name = splits.slice(1).join(' ');
            let user_obj = {};
            user_obj.user_id = user_id;
            user_obj.user_name = user_name;

            let author_id = msg.author.id;

            if (isOwner(author_id)[0] === true) {
                if (admins["admins"].length !== 0) {
                    for (let i = 0; i < admins["admins"].length; i++) {
                        if (admins["admins"][i].user_id === user_id) {
                            msg.reply("Cannot register as admin - ID is already registered.")
                            break;
                        }
                        if (i === admins["admins"].length - 1) {
                            admins["admins"].push(user_obj);
                            let admins_JSON = JSON.stringify(admins);
                            fs.writeFile('data/admins.json', admins_JSON, finished);
                            break;
                        }
                    }
                } else {
                    admins["admins"].push(user_obj);
                    let admins_JSON = JSON.stringify(admins);
                    fs.writeFile('data/admins.json', admins_JSON, finished);
                }

            } else {
                msg.reply("You do not have the permissions for this Action. An 'Owner' must perform '!registeradmin'!");
            }
        } else {
            msg.reply("You need to enter a name. Enter Please enter the command like this: ```!register USER-ID NAME```")
        }
    } else {
        msg.reply("You need to enter Information about the Admin. Please enter the command like this: ```!register USER-ID NAME```")
    }

}