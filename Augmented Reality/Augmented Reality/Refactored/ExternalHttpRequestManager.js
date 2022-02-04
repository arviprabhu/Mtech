const http = require("http");
const https = require("https");
let HttpUtility = function() {};

HttpUtility.prototype.getHttpsRequest = function() {
  return new Promise((resolve, reject) => {
    https
      .get("https://iotservice.cfapps.eu10.hana.ondemand.com/data/1", res => {
        console.log("statusCode:", res.statusCode);
        console.log("headers:", res.headers);
        let getresp = "";
        res.on("data", d => {
          getresp += d;
        });
        res.on("end", () => {
          console.log(getresp);
          resolve(getresp);
        });
      })
      .on("error", e => {
        console.error(e);
        reject(e);
      });
  });
};

module.exports = HttpUtility;
