const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req);
  /**this is for process exit or stop program */
  //   process.exit();
});

server.listen(3000);
