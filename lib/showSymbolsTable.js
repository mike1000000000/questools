// CLI Table
var Table = require("cli-table");
var colors = require("colors");
const { symbolsTableColSize } = require("../config.json");

module.exports = (symbols) => {
    var table = new Table({
        head: [
            "Symbol".brightCyan.bold,
            "Symbol ID".brightCyan.bold,
            "Prev Day".brightCyan.bold + "\n" + "Close Price".brightCyan.bold,
            "High Price".brightCyan.bold + "\n" + "52".brightCyan.bold,
            "Low Price".brightCyan.bold + "\n" + "52".brightCyan.bold,
            "Listing".brightCyan.bold + "\n" + "Exchange".brightCyan.bold,
            "Decription".brightCyan.bold,
            "Security".brightCyan.bold + "\n" + "Type".brightCyan.bold,
            "Currency".brightCyan.bold
        ],
        colWidths: symbolsTableColSize,
    });

    for (const values of symbols) {
        table.push([
            values["symbol"],
            values["symbolId"],
            values["prevDayClosePrice"] || "-",
            values["highPrice52"] || "-",
            values["lowPrice52"] || "-",
            values["listingExchange"] || "-",
            values["description"] || "-",
            values["securityType"] || "-",
            values["currency"] || "-"
        ]);
    }
    console.log("\n" + table.toString());
};
