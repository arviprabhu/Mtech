const express = require("express");
const bodyParser = require("body-parser");
const http = require("./ExternalHttpRequestManager");

let app = express();
let httpUtility = new http();
let jsonParser = bodyParser.json();

app.use("/", express.static("Static"));

app.get("/testDevice", (req, res) => {
  let options = {
    hostname: "iotservice.cfapps.eu10.hana.ondemand.com",
    path: "/data/1",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      host: "localhost:8080",
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

app.listen(process.env.PORT || 3000);
console.log("port:", process.env.PORT);
// app.listen(8080, "localhost", () => {
//   console.log(`App started on port number 8080`);
// });
