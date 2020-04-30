const { startingUrl } = require("../config.json");
module.exports = () => {
    // Get the latest refresh token
    return new Promise((resolve, reject) => {
        httpclient
            .post(
                startingUrl +
          "oauth2/token" +
          "?grant_type=refresh_token&refresh_token=" +
          currentrefreshtoken
            )
            .set("Content-Type", "application/json")
            .set("accept", "json")
            .end(function (err, res) {
                try {
                    if (verbose) console.log(res.text);
                    const response = JSON.parse(res.text);
                    db.set(
                        "refresh_token",
                        response ? response.refresh_token : ""
                    ).write();
                    db.set("access_token", response ? response.access_token : "").write();
                    db.set("api_server", response ? response.api_server : "").write();
                    db.set(
                        "expires_in",
                        response ? Math.round(new Date() / 1000) + response.expires_in : 0
                    ).write();
                    resolve("Completed refreshing Tokens");
                } catch (e) {
                    reject(e);
                }
            });
    });
};
