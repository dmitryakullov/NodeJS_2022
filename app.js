const http = require('http');
// const fs = require('fs');
console.log(global);

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('Hello world');
  })
  .listen(8080, console.log('start'));
