const fs = require('fs');

module.exports = function (id) {
    const onlinersJSON = fs.readFileSync('./data/onliners.json');
    const onliners = JSON.parse(onlinersJSON);

    let answer = [];

    for (let i = 0; i < onliners["onliners"].length; i++){

        if (onliners["onliners"][i].user_id === id){
            if (onliners["onliners"][i].status === "READY") {
                answer[0] = true;
                answer[1] = i;
                return answer;
            } else if (onliners["onliners"][i].status === "BUSY"){
                answer[0] = false;
                answer[1] = i;
                return answer;
            }
        }
    }
    answer[0] = "N/A";
    return answer;
}