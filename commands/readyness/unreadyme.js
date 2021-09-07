const fs = require('fs');
const Discord = require('discord.js');  //Import of the Discord.js-Library
//const constants = require("constants");

module.exports = function(msg,splits){
    const timestamp = Date.now();
    const onlinersJSON = fs.readFileSync('data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    let user_id = msg.author.id;
    let user_name = msg.author.username;
    let user_obj = new Object();
    user_obj.user_name = user_name;
    user_obj.user_id = user_id;
    user_obj.timestamp = timestamp;


    for (let i =0; i < onliners["onliners"].length; i++){

        if(onliners["onliners"][i].user_id === user_id){
            console.log("Element wird gelöscht");
            msg.reply("You have been logged out!")
            onliners["onliners"].splice(i, 1)
            break;
        }

        if (i == onliners["onliners"].length-1){
            console.log("User nicht angemeldet");
            msg.reply("Cannot log you out - You are not logged in!")
        }
    }
    let onliners_JSON = JSON.stringify(onliners);
    fs.writeFile('data/onliners.json',onliners_JSON, finished);
    function finished(err) {
        console.log("Onliners Ready!");
    }








    /*let user_name = msg.author.username;
    let user_id = msg.author.id;
    console.log("#1 ONLINERS:" + onliners);
    let user_obj = {username: user_name, user_id: user_id};
    //const user_obj_JSON = JSON.parse(user_obj);
    console.log("user_obj " + user_obj);
    console.log("///////////////////////////////////////////");
    onliners.push(user_obj);
    console.log("#2 ONLINERS " + onliners);

    const data = JSON.stringify(onliners);

    fs.writeFile('data/onliners.json',data, finished);
    function finished(err) {
        console.log("Onliners Ready!");
    }

    */
}