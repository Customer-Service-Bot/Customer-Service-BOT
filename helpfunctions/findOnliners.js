
const fs = require('fs');

module.exports = function(){
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);
     let answer = [];
    if (onliners["onliners"].length === 0){
        answer[0] = false
        return answer;
    } else {
        answer[0] = true;
        answer[1] = onliners["onliners"].length;
        return answer;
    }
}