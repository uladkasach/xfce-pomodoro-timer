function pad_left(number){ // https://stackoverflow.com/a/5366862/3068233
    var str = "" + number;
    var pad = "00"
    var ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
}
function calculate_time_remaining(status){
    var start_time = new Date(status.start_time);
    var current_time = new Date();
    var time_passed = current_time - start_time;

    var duration_in_minutes = status.config.time_in_minutes[status.mode];
    var total_duration = status.config.time_in_minutes[status.mode] * 60 * 1000; // convert minutes found in settings to ms

    // calculate time remaining
    var time_remaining = total_duration - time_passed;
    if(time_remaining < 0) time_remaining = 0;

    // time left in ints
    var minutes = Math.floor(time_remaining/(1000 * 60));
    var seconds = Math.floor((time_remaining - minutes * 1000 * 60)/1000);

    // time left as string
    var minutes = pad_left(minutes);
    var seconds = pad_left(seconds);

    // combine into total string
    var time_remaining = minutes + ":" + seconds;

    // return output
    return time_remaining;
}
module.exports = calculate_time_remaining;
