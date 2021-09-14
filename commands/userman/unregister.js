const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");
const isOwner = require('../readyness/isOwner');

module.exports = function (msg, splits) {
    const adminsJSON = fs.readFileSync('data/admins.json');
    const admins = JSON.parse(adminsJSON);

    let author_id = msg.author.id;
    let user_id = splits[0];
    let user_obj = {};
    user_obj.user_id = user_id;

    function finished(err) {
        console.log("Onliners Ready!");
    }

    if (isOwner(author_id)[0] === true) {
        if (admins["admins"].length !== 0) {
            for (let i = 0; i < admins["admins"].length; i++) {

                if (admins["admins"][i].user_id === user_id) {
                    console.log("Element wird gelöscht");
                    msg.reply("User deregistered!");
                    admins["admins"].splice(i, 1);
                    break;
                }

                if (i === admins["admins"].length - 1) {
                    console.log("User nicht angemeldet");
                    msg.reply("Cannot log you out - You are not logged in!");
                }
            }
        } else {
            console.log("User nicht registriert");
            msg.reply("Cannot deregister user - ID is not registered!");
        }
        let admins_JSON = JSON.stringify(admins);
        fs.writeFile('data/admins.json', admins_JSON, finished);


    } else {
        msg.reply("Cannot deregister user - Only registered 'Owners' can perform this action!");
    }

    //function finished(err) {
    //    console.log("Admins Ready!");
    //}
    //
    //if (isOwner(author_id)[0] === true) {
    //    for (let i = 0; i < admins["admins"].length; i++) {
    //        if (admins["admins"][i].user_id === user_id) {
    //            console.log("Admin wird gelöscht");
    //            msg.reply("ID deregistered!")
    //            admins["admins"].splice(i, 1)
    //            break;
    //        }
    //        if (i === admins["admins"].length - 1) {
    //            admins["admins"].push(user_obj);
    //            let admins_JSON = JSON.stringify(admins);
    //            fs.writeFile('data/admins.json', admins_JSON, finished);
    //            break;
    //        }
    //    }
    //    let admins_JSON = JSON.stringify(admins);
    //    fs.writeFile('data/admins.json', admins_JSON, finished);
    //
    //} else {
    //    msg.reply("You do not have the permissions for this Action. An 'Owner' must perform '!deregister'!");
    //}


    //for (let i = 0; i < onliners["onliners"].length; i++) {
    //    if (onliners["onliners"][i].user_id === user_id) {
    //        console.log("Element wird gelöscht");
    //        msg.reply("You have been logged out!")
    //        onliners["onliners"].splice(i, 1)
    //        break;
    //    }
    //
    //    if (i === onliners["onliners"].length - 1) {
    //        console.log("User nicht angemeldet");
    //        msg.reply("Cannot log you out - You are not logged in!")
    //    }
    //}
    //let onliners_JSON = JSON.stringify(onliners);
    //fs.writeFile('data/onliners.json', onliners_JSON, finished);
    //
    //function finished(err) {
    //    console.log("Onliners Ready!");
    //}
}