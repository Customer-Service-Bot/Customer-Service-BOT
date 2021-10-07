//removes the user fitting the given id from the admins.json

const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
const isOwner = require('../../helpfunctions/isOwner');

module.exports = function (msg, splits) {
    const adminsJSON = fs.readFileSync('data/admins.json');
    const admins = JSON.parse(adminsJSON);

    //Gets all the required values
    let author_id = msg.author.id;
    let user_id = splits[0];
    let user_obj = {};
    user_obj.user_id = user_id;

    function finished(err) {
        console.log("Onliners Ready!");
    }
    //checks if the message creator is an Owner
    if (isOwner(author_id)[0] === true) {
        //Removes the User from the admins.json
        if (admins["admins"].length !== 0) {
            for (let i = 0; i < admins["admins"].length; i++) {

                if (admins["admins"][i].user_id === user_id) {
                    msg.reply("User deregistered!").catch(console.error);
                    admins["admins"].splice(i, 1);
                    break;
                }

                if (i === admins["admins"].length - 1) {
                    msg.reply("Cannot log you out - You are not logged in!").catch(console.error);
                }
            }
        } else {
            msg.reply("Cannot deregister user - ID is not registered!");
        }
        let admins_JSON = JSON.stringify(admins);
        fs.writeFile('data/admins.json', admins_JSON, finished);


    } else {
        msg.reply("Cannot deregister user - Only registered 'Owners' can perform this action!").catch(console.error);
    }
}