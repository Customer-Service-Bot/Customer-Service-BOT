const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");

const isOwner = require('/help_functions/isOwner');
const isAdmin = require('/help_functions/isAdmin');
const isOnline = require('/help_functions/isOnline');
const isReady = require('/help_functions/isReady');



module.exports = function (msg, splits) {
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    function finished(err) {
        console.log("Status to ready!");
        msg.reply("You have been set to ready!");
    }

    //let timestamp = onliners["onliners"].user_id;
    //let user_id = msg.author.id;
    //let user_name = msg.author.username;
    //let user_obj = {};
    //user_obj.user_name = user_name;
    //user_obj.user_id = user_id;
    //user_obj.timestamp = timestamp;

    if (isAdmin(user_id)[0] === true) {
        if (isOnline(user_id)[0] === true) {
            if (isReady(user_id)[0] === true){
                console.log("User is already set to READY");
                msg.reply("You can not be set to 'ready' - You are already set to 'ready'");
            }
            if (isReady(user_id)[0] === false){


                  for (let i = 0; i < onliners["onliners"].length; i++) {
                      if (onliners["onliners"].user_id === user_id) {

                          let timestamp = onliners["onliners"][i].user_id;
                          let user_id = msg.author.id;
                          let user_name = msg.author.username;
                          let user_obj = {};
                          user_obj.user_name = user_name;
                          user_obj.user_id = user_id;
                          user_obj.timestamp = timestamp;
                          user_obj.status = "READY";

                          onliners["onliners"].push(user_obj);
                          let onliners_JSON = JSON.stringify(onliners);
                          fs.writeFile('data/onliners.json', onliners_JSON, finished);
                          break;
                      }
                  }


            }

            //if (onliners["onliners"].length !== 0) {
            //    for (let i = 0; i < onliners["onliners"].length; i++) {
            //
            //        if (onliners["onliners"][i].user_id === user_id) {
            //            console.log("Element vorhanden");
            //            msg.reply("Cannot log you in - You are already logged in!")
            //            break;
            //        }
            //        if (i === onliners["onliners"].length - 1) {
            //            onliners["onliners"].push(user_obj);
            //            let onliners_JSON = JSON.stringify(onliners);
            //            fs.writeFile('data/onliners.json', onliners_JSON, finished);
            //            break;
            //        }
            //    }
            //} else {
            //    onliners["onliners"].push(user_obj);
            //    let onliners_JSON = JSON.stringify(onliners);
            //    fs.writeFile('data/onliners.json', onliners_JSON, finished);
            //}
        } else {
            msg.reply("Cannot set you to 'Ready' - You are not logged in yet! Type '!onlineme' to do so.");
        }
    } else {
        msg.reply("Cannot set you to 'Ready' - You are not a registered admin!");
    }

}