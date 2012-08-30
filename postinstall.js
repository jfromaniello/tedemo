var exec = require("child_process").exec,
    path = require("path"),
    async = require("async");

function executeCommand(command, callback){
    var childProc = exec(command, {}, callback || function(){});
    childProc.stdout.pipe(process.stdout);
    childProc.stderr.pipe(process.stderr);
}

var tasks = [
    "jam install"
  ];

if(process.env.NODE_ENV === "production"){
  //compile the templates into template.js files
  tasks.push("jade-amd --from views/includes/ --to public/templates -r jade-runtime");
  
  //generate your one file application script
  tasks.push("jam compile -i /main.js -o public/jam/require.js --almond");
  
  //remove the templates folder
  tasks.push("rm -rf public/templates");
}

async.series(tasks.map(function(t){
  return executeCommand.bind(this, t);
}));