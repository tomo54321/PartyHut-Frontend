export const secondsToReadableTime = (d: number) => {

    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    let output = "";
    if(h > 0){
        output += ('0' + h).slice(-2) + ":";
    }
    if(m > 0 || h > 0){
        output += ('0' + m).slice(-2) + ":";
    }
    output += ('0' + s).slice(-2);

    return output;
}