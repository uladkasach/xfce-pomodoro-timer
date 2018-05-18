function generate_tag(tag, content){
    var string = "<" + tag + ">" + content + "</" + tag + ">";
    return string;
}
var option_types = ["click", "txt", "img", "tool"];
function output_status(options){
    // normalize options
    if(typeof options.text == "string") options.txt = options.text;

    // generate output
    var output = [];
    option_types.forEach((option)=>{
        if(typeof options[option] == "string") output.push(generate_tag(option, options[option]));
    })
    var output_string = output.join(" ");
    return output_string;
}
module.exports = output_status;
