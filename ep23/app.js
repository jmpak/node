var express = require('express');
require('express-resource');
var fs = require('fs');

var app = express.createServer();
var port = process.env.PORT || 4000;

app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + "/static"));
});

app.configure('development', function() {
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpException : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.logger());
	app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	res.send('index');
});

var products = app.resource('products', require('./modules/products'));
var forums = app.resource('forums', require('./modules/forums'));

products.add(forums);

app.listen(port);
