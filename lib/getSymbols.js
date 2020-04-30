symbols = [];
module.exports = (symbolnames) => {
    return new Promise((resolve, reject) => {
        httpclient
            .get(currentApiSite + "v1/symbols?names=" + symbolnames)
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + currentAccessToken)
            .end(function (err, res) {
                try {
                    if (verbose) console.log(res.text);
                    const response = JSON.parse(res.text);
                    for (var key in response["symbols"]) {
                        symbols.push(response["symbols"][key]);
                    }
                    resolve("Completed Symbols Query");
                } catch (e) {
                    reject(e);
                }
            });
    });
};
