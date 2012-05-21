var connect = require('connect');

var port = process.env.PORT || 4000;

connect.createServer(
    require(__dirname + '/log-it.js')(),
    require(__dirname + '/serve-js')()
).listen(port);