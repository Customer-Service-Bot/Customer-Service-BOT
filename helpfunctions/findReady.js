//Checks if there are Admins with the status ready and returns an array [true/false, amount]

const fs = require('fs')

module.exports = function(){
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    let ready_users = 0;
    for (let i = 0; i < onliners["onliners"].length; i){
        if (onliners["onliners"][i].status === 'READY'){
            ready_users = ready_users + 1;
        }
        i++;
    }

    let answer = [];
    if (ready_users === 0){
        answer[0] = false;
        return answer;
    } else {
        answer[0] = true;
        answer[1] = ready_users;
        return answer;
    }
}