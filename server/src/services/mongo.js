const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
  mongoose.set("strictQuery", false);
}

async function mongoDisconnet() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnet,
};
