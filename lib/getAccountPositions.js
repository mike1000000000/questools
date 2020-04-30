positions = [];
module.exports = (accountnumber) => {
    return new Promise((resolve, reject) => {
        httpclient
            .get(currentApiSite + "v1/accounts/" + accountnumber + "/positions")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + currentAccessToken)
            .end(function (err, res) {
                try {
                    if (verbose) console.log("Account number: " + accountnumber);
                    if (res.status != 200) {
                        console.log("failed");
                        resolve("Invalid accountnumber");
                        return;
                    }
                    if (verbose) console.log(res.text);
                    const response = JSON.parse(res.text);
                    for (var [key, value] of Object.entries(response["positions"])) {
                        value.account = accountnumber;
                        positions.push(value);
                    }
                    resolve("Completed Account Positions for " + accountnumber);
                } catch (e) {
                    reject(e);
                }
            });
    });
};
