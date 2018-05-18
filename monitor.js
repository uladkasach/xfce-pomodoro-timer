var output_status = require("./utils/output_status.js");
var notify_user = require("./utils/xfce_notification.js");
var calculate_time_remaining = require("./utils/calculate_time_remaining.js");

//

// define environment constants
var package_dir = process.env.src_root = __dirname;

// define commands
var args = process.argv.slice(2);
var config_dir = args[0];
var command = args[1];

// retreive current status
var fs = require('fs');
var status_file = config_dir + '/.status.json';
var status = JSON.parse(fs.readFileSync(status_file, 'utf8'));

/*
    handle commands
*/
if(command == "stop"){
    notify_user("stoping timer");
    status.active = false;
    fs.writeFileSync(status_file, JSON.stringify(status));
}
if(command == "start"){
    // notify
    notify_user("starting timer");

    // read config
    var config_file = config_dir + "/config.json";
    var config = JSON.parse(fs.readFileSync(config_file, 'utf8'));

    // update status
    status.active = true;
    status.cycles = 0;
    status.mode = "work";
    status.start_time = new Date();
    status.config = config; // append config to status so that we dont need to read config file every time

    // record status
    fs.writeFileSync(status_file, JSON.stringify(status));
}



/*
    respond to status
*/
function change_status_mode(status, status_file){ // a utility used in active mode. logically very similar to content in the rest of this file so it remains in this file.
    // update the status mode, start time, and cycles
    if(status.mode == "work"){
        status.mode = "break_short";
    } else {
        status.mode = "work";
        status.cycles += 1; // starting another cycle
    }
    status.start_time = new Date();

    // notify user of mode change
    notify_user("time is up! changing mode to " + status.mode);

    // record the changes
    fs.writeFileSync(status_file, JSON.stringify(status));
}
if(status.active === true){
    // calculate time remaining
    var time_remaining = calculate_time_remaining(status);

    // change status mode if timer has expired
    if(time_remaining == "00:00") change_status_mode(status, status_file);

    // if break, append "B:" to start of time
    if(status.mode != "work") time_remaining = "B:" + time_remaining;

    // display time and display stop button
    var output = output_status({
        tool : "click to stop the timer",
        img : package_dir + "/assets/icons/stop-20.png",
        txt : time_remaining,
        click : package_dir + "/monitor.sh stop"
    });
} else {
    // display start button
    var output = output_status({
        tool : "click to start the timer",
        img : package_dir + "/assets/icons/timer-20.png",
        click : package_dir + "/monitor.sh start"
    })
}

// display the output
console.log(output);
