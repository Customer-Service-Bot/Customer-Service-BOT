//logs the admin with the given id out

const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library

const isOwner = require('../../helpfunctions/isOwner');
const isAdmin = require('../../helpfunctions/isAdmin');

module.exports = function (msg, splits) {
    const timestamp = Date.now();
    const onlinersJSON = fs.readFileSync('data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    //creates user object
    let user_id = msg.author.id;
    let user_name = msg.author.username;
    let user_obj = {};
    user_obj.user_name = user_name;
    user_obj.user_id = user_id;
    user_obj.timestamp = timestamp;

    function finished(err) {
        console.log("Onliners Ready!");
    }
    //checks if the sender is an Admin
    if (isAdmin(user_id)[0] === true) {
        //removes Admin from the onliners.json
        if (onliners["onliners"].length !== 0) {
            for (let i = 0; i < onliners["onliners"].length; i++) {

                if (onliners["onliners"][i].user_id === user_id) {
                    msg.reply("You have been logged out!").catch(console.error);
                    onliners["onliners"].splice(i, 1);
                    break;
                }

                if (i === onliners["onliners"].length - 1) {
                    msg.reply("Cannot log you out - You are not logged in!").catch(console.error);
                }
            }
        } else {
            msg.reply("Cannot log you out - You are not logged in!").catch(console.error);
        }
        let onliners_JSON = JSON.stringify(onliners);
        fs.writeFile('data/onliners.json', onliners_JSON, finished);


    } else {
        msg.reply("Cannot log you out - You are not a registered admin!").catch(console.error);
    }

}