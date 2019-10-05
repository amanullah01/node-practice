const http = require("http");
const server = http.createServer((req, res) => {
  console.log("hello world");
  console.log(req.url, req.method, req.headers);
  /**this is for process exit or stop program */
  //   process.exit();

  //Response
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first node page</title></head>");
  res.write("<body><h1>Hello from node js server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
