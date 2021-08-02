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

require("./app/rest.routes.js")(app);

// set port, listen for requests
app.listen(config.app.port, () => {
  console.log("Server is running on port "+config.app.port);
});


// busca das configurações o agendamento do cron
let jobConf = config.job;
let schedule = `${jobConf.cronMinuto} ${jobConf.cronHora} * * *`;

//agenda o job de acordo com o configurado
cron.schedule(schedule, () => {
  job.execute();
});
 


