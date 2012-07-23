var net = require('net');
var stats = require('./statistics');

function connect() {
  process.stdout.write('#');
  var time = Date.now();
  var conn = net.createConnection(4000);
  
  conn.on('connect', function() {
    stats.collect('connect', Date.now() - time);
    console.log('connected');
    var latencyTime = Date.now();
    conn.write('Hello');
    conn.on('data', function(){
      stats.collect('data', Date.now() - latencyTime);
    });
  });
  
  conn.on('close', function(){
    console.log('closed');
    conn.end();
  });
}

setInterval(connect, 100);

process.on('SIGINT', function() {
  stats.summarize();
  process.exit();
});
