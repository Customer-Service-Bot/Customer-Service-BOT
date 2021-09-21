const fs = require('fs');

const Discord = require('discord.js')
const {MessageEmbed} = require("discord.js");

module.exports = function(msg,splits){
    const onlinersJSON = fs.readFileSync('data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    function msToTime (ms){
        let date = new Date(ms);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;
    }



    const user_embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Logged-in Users')

        for (let i =0; i < onliners["onliners"].length; i++){
            let timestamp = msToTime(onliners["onliners"][i].timestamp);
            user_embed.addFields(
                { name: '\u200B', value: '\u200B' },
                { name: "Name:   ", value: onliners["onliners"][i].user_name, inline: true},
                { name: "Status:   ", value: onliners["onliners"][i].status, inline: true},
                { name: "Logged-In Since:   ", value: timestamp, inline:true}

            )
        }


    msg.reply({ embeds: [user_embed] });
}