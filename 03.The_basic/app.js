const http = require("http");
const server = http.createServer((req, res) => {
  console.log("hello world");
  console.log(req.url, req.method, req.headers);
  /**this is for process exit or stop program */
  //   process.exit();
});

server.listen(3000);
