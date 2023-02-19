const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const { app } = require(`${__dirname}/app.js`);
const { mongoConnect } = require("./services/mongo.js");
const { loadPlanetsData } = require(path.join(
  __dirname,
  "models",
  "planets.model.js"
));
const { loadLaunchesData } = require("./models/launches.model");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`listening to port: ${PORT}`);
    }
  });
}

startServer();
