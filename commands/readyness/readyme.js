const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");

module.exports = function(msg,splits){
    const onlinersJSON = fs.readFileSync('data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    const timestamp = Date.now();
    let user_id = msg.author.id;
    let user_name = msg.author.username;
    let user_obj = new Object();
    user_obj.user_name = user_name;
    user_obj.user_id = user_id;
    user_obj.timestamp = timestamp;


    for (let i =0; i < onliners["onliners"].length; i++){

        if(onliners["onliners"][i].user_id === user_id){
            console.log("Element vorhanden");
            msg.reply("Cannot log you in - You are already logged in!")
            break;
        }
        if (i == onliners["onliners"].length-1){
            onliners["onliners"].push(user_obj);
            let onliners_JSON = JSON.stringify(onliners);
            fs.writeFile('data/onliners.json',onliners_JSON, finished);
            function finished(err) {
                console.log("Onliners Ready!");
                msg.reply("You have been logged in!");
            }
            break;
        }
    }
}