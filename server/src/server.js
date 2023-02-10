const http = require("http");
const path = require("path");
const { app } = require(`${__dirname}/app.js`);
const { loadPlanetsData } = require(path.join(
  __dirname,
  "models",
  "planets.model.js"
));

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
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
