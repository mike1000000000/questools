// Json database
low = require("lowdb");
FileSync = require("lowdb/adapters/FileSync");

// Manage json db file
dbadapter = new FileSync("./db.json");
db = low(dbadapter);
db.defaults({
    refresh_token: "",
    access_token: "",
    api_server: "",
    expires_in: 0,
    token_type: "Bearer",
    watched: [],
}).write();

currentrefreshtoken = "";
currentAccessToken = "";
currentApiSite = "";
currentAccessTokenExpires = "";

module.exports.loadDbVals = () => {
    currentrefreshtoken = db.get("refresh_token").value();
    currentAccessToken = db.get("access_token").value();
    currentApiSite = db.get("api_server").value();
    currentAccessTokenExpires = db.get("expires_in").value();
};

module.exports.clearDbVals = () => {
    db.set("refresh_token", "").write();
    db.set("access_token", "").write();
    db.set("api_server", "").write();
    db.set("expires_in", "").write();
};

module.exports.addSymbolName = (symbol) => {
    db.get("watched").pull(symbol).push(symbol).write();
    console.log("\nNow watching [" + symbol  + "]\n");
};

module.exports.removeSymbolName = (symbol) => { 
    db.get("watched").pull(symbol).write();
    console.log("\nNo longer watching [" + symbol  + "]\n");
};

module.exports.getSymbolNames = () => {
    return db.get("watched").value();
};
