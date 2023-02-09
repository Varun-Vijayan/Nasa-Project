const http = require("http");
const { app } = require(`${__dirname}/app.js`);

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening to port: ${PORT}`);
  }
});
