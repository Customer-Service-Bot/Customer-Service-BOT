const fs = require('fs');

module.exports = function (id) {
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    let answer = [];

    for (let i = 0; i < onliners["onliners"].length; i++){

        if (onliners["onliners"][i].user_id === id){
            answer[0] = true;
            answer[1] = i;
            return answer;
        }
    }
    answer[0] = false;
    return answer;
}