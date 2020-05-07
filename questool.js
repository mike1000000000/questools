#!/usr/bin/env node
const start = new Date();

const refreshToken = require("./lib/refreshtoken.js");
const getAccount = require("./lib/getAccount.js");
const getAccountPositions = require("./lib/getAccountPositions.js");
const showPositionsTable = require("./lib/showPositionsTable");
const getSymbols = require("./lib/getSymbols.js");
const showSymbolsTable = require("./lib/showSymbolsTable");

// Load command line options
const args = require("./lib/options.js")();
const { token, help, Version } = args;
const cmd = args._[0];

if (help || Version) process.exit(0);

// http client
httpclient = require("superagent");

// Json DB connector
const dbConnector = require("./lib/db.js");
dbConnector.loadDbVals();

(async () => {
    try {
        if (verbose) {
            console.log("Current access token expires: " + currentAccessTokenExpires);
            console.log("Current time:" + Math.round(new Date() / 1000));
        }

        if (token) {
            dbConnector.clearDbVals();
            db.set("refresh_token", token).write();
            currentrefreshtoken = token;
        }

        if (Math.round(new Date() / 1000) > currentAccessTokenExpires || token) {
            await refreshToken();
            if(!showjson) console.log("Requested new Access Token");
            dbConnector.loadDbVals();
        }

        if (!currentAccessToken) {
            console.log("No access token.");
            return;
        }

        if (!cmd) {
            console.log("\nNo command provided. Please see help by using the '--help' argument.\n");
            return;
        }

        switch (cmd.toLowerCase()) {
        case "positions":
            await getAccount();
            for (const element of accounts) {
                await getAccountPositions(element["number"]);
            }
            if (!positions.length) {
                console.log("No positions.");
                return;
            }
            showjson ? console.log(positions) : showPositionsTable(positions);
            break;
        case "show":
            await getSymbols(args._.slice(1).toString());
            if (!symbols.length) {
                console.log("No symbols provided.");
                return;
            }
            showjson ? console.log(symbols) : showSymbolsTable(symbols);
            break;
        case "watch":
            for (const symbol of args._.slice(1)) {
                dbConnector.addSymbolName(symbol);
            }
            break;

        case "unwatch":
            for (const symbol of args._.slice(1)) {
                dbConnector.removeSymbolName(symbol);
            }
            break;

        case "watched":
            const watchedsymbols = dbConnector.getSymbolNames();
            await getSymbols(watchedsymbols.toString());
            if (!symbols.length) {
                console.log("No symbols provided.");
                return;
            }
            showjson ? console.log(symbols) : showSymbolsTable(symbols);
            break;
        default:
            console.log("No tool selected.");
        }
    } catch (e) {
        console.log("There was an error: " + e);
    }
})();

// Output script execution time upon exit.
process.on("beforeExit", async () => {
    var end = new Date() - start;
    if(verbose) console.info("Execution time: %dms", end);
    process.exit(0);
});
