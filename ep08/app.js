var connect = require('connect');

connect.createServer(
	require(__dirname + '/log-it')(),
	require(__dirname + '/serve-js')()
).listen(4000);