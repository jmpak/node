var http = require('http');
var fs = require('fs');

var port = process.env.PORT || 8080;
console.log(port);

var file_path = __dirname + "/us.jpg";
fs.stat(file_path, function(err, stat) {
    if(err) throw err;
    var file_size = stat.size;
    
    fs.readFile(file_path, function(err, file_content) {
        if(err) throw err;
        http.createServer(function(request, response) {
            response.writeHead(200, {
                'Content-Type' : 'image/jpeg',
                'Content-Length' : stat.size
            });
            response.end(file_content);
        }).listen(port); 
    });
}); 



