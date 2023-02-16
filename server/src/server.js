const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const { app } = require(`${__dirname}/app.js`);
const { loadPlanetsData } = require(path.join(
  __dirname,
  "models",
  "planets.model.js"
));

const PORT = process.env.PORT || 5000;

const MONGO_URL =
  "mongodb+srv://varun:Qb4zcMreaIknWeym@nasacluster.gsattpg.mongodb.net/nasa?retryWrites=true&w=majority";
const server = http.createServer(app);

async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready");
  });
  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`listening to port: ${PORT}`);
    }
  });
}

startServer();
