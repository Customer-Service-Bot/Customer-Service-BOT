const fs = require('fs');

module.exports = function (id) {
    const adminsJSON = fs.readFileSync('./data/admins.json');
    const admins = JSON.parse(adminsJSON);

    let answer = [];

    for (let i = 0; i < admins["owners"].length; i++){

        if (admins["owners"][i].user_id === id){
            console.log("True");
            answer[0] = true;
            answer[1] = i;
            return answer;
        }
    }
    console.log("False")
    answer[0] = false;
    return answer;
}