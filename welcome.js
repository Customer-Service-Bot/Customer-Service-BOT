
module.exports = function (member){
    //console.log("New User")
    //console.log(member.id);
    member.send("Willkommen auf dem Server von 'Test-Company'.")

    //Roll assignment
    let role= member.guild.roles.cache.find(role => role.name === "Customer");
    member.roles.add(role);
}