var sys = require('util');

module.exports = function() {
	
	var counter = 0;
	
	return function(req, res, next) {
		var writeHead = res.writeHead;
		
		counter++;
		
		res.writeHead = function(code, headers) {
			res.writeHead = writeHead;
			console.log("Response #" + counter + ": " + code + ' ' + sys.inspect(headers));
		}
		
		next();
	}
};