var http = require('http'),
    sys = require('sys'),
    fs = require('fs'),
    ws = require('./ws.js');

var clients = [];

var port = process.env.PORT || 4000;
console.log(port);

http.createServer(function(request, response) {
    response.writeHead(200, {
       'Content-type': 'text/html' 
    });
    
    var rs = fs.createReadStream(__dirname + "/template.html");
    sys.pump(rs, response);
    
}).listen(port);

ws.createServer(function(websocket) {
    var username;
    websocket.on('connect', function(resource) {
       clients.push(websocket);
       websocket.write('Welcome, to the chat server');
       websocket.write('Please input  your username : ');
    }); 
   
    websocket.on('data', function(data) {
        if(!username) {
            username = data.toString();
            websocket.write("Hello " + username + "!\n");
            return;
        }
        
        var message = username + " : " + data.toString();
        
        clients.forEach(function(client) {
            client.write(message); 
        }); 
   });
   
   websocket.on('close', function() {
      var pos = clients.indexOf(websocket);
      if (pos >= 0) {
          clients.splice(pos, 1);
      } 
   });
}).listen(8080);