var net = require('net');

net.createServer(function(conn) {
  conn.on('data', function(data) {
    console.log(data.toString());
    setTimeout(function() {
      conn.end(data);
    }, 500);
  });
}).listen(4000);
