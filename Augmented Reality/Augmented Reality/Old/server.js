const express = require("express");
const bodyParser = require("body-parser");
const http = require("./ExternalHttpRequestManager");

let app = express();
let httpUtility = new http();
let jsonParser = bodyParser.json();

let options = {
  hostname: "lms-dev-upg",
  port: 8080,
  path: "/learning/oauth-api/rest/v1/token",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    host: "lms-dev-upg:8080",
    "cache-control": "no-cache",
    accept: "*/*",
    "Content-Length": ""
  }
};

app.use("/", express.static("static"));

app.post("/v1/token", jsonParser, (req, res) => {
  let data = JSON.stringify(req.body);
  let options = {
    hostname: "lms-dev-upg",
    port: 8080,
    path: "/learning/oauth-api/rest/v1/token",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: "lms-dev-upg:8080",
      "cache-control": "no-cache",
      accept: "*/*",
      "Content-Length": ""
    }
  };
  options.headers["Content-Length"] = JSON.stringify(req.body).length;
  httpUtility.postRequest
    .call(options, data)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.send({ error: "Unable to process Request" });
    });
});

app.get(
  "/learning/odatav4/public/user/learningHistory/v1/LearningHistories",
  (req, res) => {
    let relPath = encodeURI(`${req.path}?$filter=${req.query.$filter}`);
    let options = {
      hostname: "lms-dev-upg",
      port: 8080,
      path: relPath,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        host: "lms-dev-upg:8080",
        "cache-control": "no-cache",
        Accept: "application/json",
        Authorization: `${req.headers.authorization}`
      }
    };
    httpUtility.getRequest
      .call(options)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.send({ error: "Unable to Fetch Learning History" });
      });
  }
);

app.post("/publishStream", (req, res) => {
  let options = {
    hostname: "localhost",
    port: 9000,
    path: "/publishStream",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: "localhost:9000",
      "cache-control": "no-cache",
      accept: "*/*",
      "Content-Length": JSON.stringify(req.body).length
    }
  };
  httpUtility.postRequest
    .call(options, data)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.send({ error: "Unable to post data to BlockChain" });
    });
});

app.get("/testDevice", (req, res) => {
  let options = {
    hostname: "gservice.cfapps.eu10.hana.ondemand.com",
    path: "/device/1",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      host: "localhost:9000",
      "cache-control": "no-cache",
      accept: "*/*"
    }
  };
  httpUtility
    .getHttpsRequest()
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.sendStatus(500);
    });
});

app.listen(9000, "localhost", () => {
  console.log(`App started on port number 9000`);
});
