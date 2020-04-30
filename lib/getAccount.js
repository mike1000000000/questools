accounts = [];
module.exports = () => {
    return new Promise((resolve, reject) => {
        httpclient
            .get(currentApiSite + "v1/accounts")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + currentAccessToken)
            .end(function (err, res) {
                try {
                    if (verbose) console.log(res.text);
                    const response = JSON.parse(res.text);
                    for (var key in response["accounts"]) {
                        accounts.push(response["accounts"][key]);
                    }
                    resolve("Completed Account Query");
                } catch (e) {
                    reject(e);
                }
            });
    });
};
