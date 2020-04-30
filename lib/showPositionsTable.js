// CLI Table
var Table = require("cli-table");
var colors = require("colors");
const { positionsTableColSize } = require("../config.json");

module.exports = (positions) => {
    var table = new Table({
        head: [
            "Account Number".brightCyan.bold,
            "Symbol".brightCyan.bold,
            "Symbol ID".brightCyan.bold,
            "Quantity".brightCyan.bold,
            "Entry price".brightCyan.bold,
            "Current price".brightCyan.bold,
        ],
        colWidths: positionsTableColSize,
    });

    for (const values of positions) {
        const currentprice =
            values["averageEntryPrice"] > values["currentPrice"]
                ? values["currentPrice"].toString().brightRed
                : values["currentPrice"].toString().brightGreen;
        table.push([
            values["account"],
            values["symbol"],
            values["symbolId"],
            values["openQuantity"],
            values["averageEntryPrice"],
            currentprice,
        ]);
    }
    console.log("\n" + table.toString());
};
