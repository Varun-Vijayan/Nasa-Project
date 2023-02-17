const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://varun:Qb4zcMreaIknWeym@nasacluster.gsattpg.mongodb.net/nasa?retryWrites=true&w=majority";

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
