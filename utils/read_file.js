
var fs = require('fs');
var promise_to_read_file = async function(file) {
    return new Promise((resolve, reject)=>{
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

module.exports = promise_to_read_file;
