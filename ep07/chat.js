var http = require('http'),
	sys = require('util'),
	fs = require('fs'),
	io = require('socket.io');

var clients = [];

var server = http.createServer(function(request, response) {
	response.writeHead(200, {
		'Content-Type' : 'text/html',
	});
	
	var rs = fs.createReadStream(__dirname + '/template.html');
	sys.pump(rs, response);
	
});

var socket = io.listen(server);
socket.sockets.on('connection', function(client) {
	client.send('Welcome to this socket.io chat server!');
	client.send('Please input your username:');
	
	var username;
	
	client.on('messsage', function(message) {
		console.log('dddd');
		console.log(username);
		if(!username) {
			username = message;
			client.send('Welcome, ' + username + '!');
			return;
		}
		message = username + " : " + message;
		socket.broadcast(message);
	});
});
server.listen(4000);
