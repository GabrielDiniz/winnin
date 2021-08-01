const express = require("express");
const bodyParser = require("body-parser");
const cron = require('node-cron');
const job = require("./app/jobs/posts.job.js");
const config = require("./config/app.config.js");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json("Hello World!!!");
});

require("./app/rest.routes.js")(app);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});



let jobConf = config.job;
let schedule = `${jobConf.retrieveMinute} ${jobConf.retrieveHour} * * *`;


cron.schedule(schedule, () => {
  job.execute();
});
 


