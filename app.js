const http = require("http");

const routes = require("./routes");
console.log(routes.someText);

// const server = http.createServer(routes);
const server = http.createServer(routes.handler);

/*
const server = http.createServer((req, res) => {
  //console.log("hello world");
  //Request
  //console.log(req.url, req.method, req.headers);
  //this is for process exit or stop program 
  //   process.exit();
  //Response
});
*/

server.listen(3000);
