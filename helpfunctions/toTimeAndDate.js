
module.exports = function (ms) {

    //let ms = Date.now();

    let date = new Date(ms);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = day + '.' + (month + 1) + '.' + year + '    ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime);

    return formattedTime;

}