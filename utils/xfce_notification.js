var exec = require('child_process').exec;
var execute_command = function(command){
    return new Promise((resolve, reject)=>{
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({stdout : stdout, stderr : stderr});
            }
        });
    })
}

var duration_ms = 2 * 1000;
var create_notification = async function(text, icon){
    var icon_string = "";
    if(typeof icon == "string") icon_string = " -i " + icon
    var command = 'notify-send -t ' + duration_ms + icon_string + ' "Pomodoro Timer" "'+text+'"';
    var response = await execute_command(command);
    return response;
}

// example: create_notification("test", "/home/vlad/utils/pomodoro/assets/icons/play.png");
module.exports = create_notification;
