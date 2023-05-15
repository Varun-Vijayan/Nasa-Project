const http = require('http');
const { app } = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening to port ${PORT}`);
  });
}

startServer();
