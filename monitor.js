var output_status = require("./utils/output_status.js");

var args = process.argv.slice(2);
var config_dir = args[0];
var command = args[1];


// if command is not defined, then we simply show the status time.
var time = new Date();
var time_string = (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
var status = output_status({
    text : time_string,
    //tool : "test",
    //img : "/home/vlad/utils/pomodoro/icons/play.png"
})
console.log(status);
// console.log("<txt>14:30:39</txt><img>/home/vlad/utils/pomodoro/icons/play.png</img><tool>test</tool>");


// if the command is not defined and the
