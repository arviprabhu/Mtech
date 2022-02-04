const http = require("http");
const https = require("https");
let HttpUtility = function() {};

HttpUtility.prototype.getRequest = function() {
  return new Promise((resolve, reject) => {
    let getReq = http.request(this, getResp => {
      let getResData = "";
      getResp.on("data", data => {
        getResData += data;
      });
      getResp.on("end", () => {
        resolve(JSON.parse(getResData));
      });
    });
    getReq.on("error", e => {
      reject(e);
    });
    getReq.end();
  });
};

HttpUtility.prototype.getHttpsRequest = function() {
  return new Promise((resolve, reject) => {
    https
      .get("https://gservice.cfapps.eu10.hana.ondemand.com/device/1", res => {
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

HttpUtility.prototype.postRequest = function(data) {
  return new Promise((resolve, reject) => {
    let postReq = http.request(this, postResp => {
      let postResData = "";
      postResp.on("data", data => {
        postResData += data;
      });
      postResp.on("end", () => {
        resolve(postResData);
      });
    });
    postReq.on("error", e => {
      reject(e);
    });
    postReq.write(data);
    postReq.end();
  });
};

module.exports = HttpUtility;
