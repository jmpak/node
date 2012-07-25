var nano = require('nano');
var db_server = nano("http://admin:admin@jmpak.iriscouch.com");
var db = db_server.use('ep30');
var fs = require('fs');

var writeStream = fs.createWriteStream('/tmp/Mexico.jpg');
db.attachment.get('doc_two', 'my_photo').pipe(writeStream);
