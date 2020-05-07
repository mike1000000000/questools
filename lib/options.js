const { version, author } = require("../package.json");
verbose = false;
showjson = false;

// Parse arguments
module.exports = () => {
    const options = {
        alias: { v: "verbose", t: "token", h: "help", V: "Version", j: "json" },
    };
    const args = require("minimist")(process.argv.slice(2), options);
    if (args["Version"]) {
        console.log(`v${version} - Written by ${author}`);
    }
    if (args["help"]) {
        const help = `
    Usage: questool [command] [arguments] 
           
    Commands:
      positions            Show a table of positions  
                           example: questool positions 

      show                 Show a table of symbol info from the command line
                           example: questool show AAAA ABCD 

      watched              Show a table of symbol info from a stored set of symbols
                           example: questool watched 

      watch                Add a symbol to the stored set
                           example: questool watch AAAA
      
      unwatch              Remove a symbol from the stored set
                           example: questool unwatch ABCD 

    Arguments:
      -t, --token         Set initial refresh token
      -v, --verbose       Output json results for debugging
      -h, --help          Help, this menu
      -V, --Version       Prints version
      -j, --json          Outputs results in JSON only
  
      
    Written by Michel Noel © 2020
      `;
        console.log(help);
    }
    verbose = args["verbose"] ? true : false;
    showjson = args["json"] ? true : false;

    return args;
};
