var express = require('express');

var multipart = require("./multipart/lib/multipart");
var parser = multipart.parser();
var fs = require('fs');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/db');

var app = express.createServer();
var port = process.env.PORT || 4000;

var Memstore = require('connect').session.MemoryStore;

app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + "/static"));
	app.use(express.cookieParser());
	app.use(express.session({secret: 'secret', store: Memstore( {
	  reapInterval: 60000 * 10
	})}));
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

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.dynamicHelpers(
  {
    session: function(req, res) {
      return req.session;
    },
    
    flash: function(req, res) {
      return req.flash();
    }
  }
);

function requiresLogin(req, res, next) {
  if(req.session.user) {
    next();
  } else { 
    res.redirect('/sessions/new?redir=' + req.url);
  }
}

app.get('/', function(req, res) {
	res.render('root');
});

/* Sessions */
require('./users');

var Users = db.model('users');

app.get('/sessions/new', function(req, res) {
  res.render('sessions/new', {locals: {
    redir: req.query.redir
  }});
});

app.get('/sessions/destroy', function(req, res) {
  delete req.session.user;
  res.redirect('/sessions/new')
});

app.post('/sessions', function(req, res) {
  Users.authenticate(req.body.login, req.body.password).findOne(function(err, user) {
    if(user) {
      req.session.user = user;
      res.redirect(req.body.redir || '/');
    } else {
      req.flash('warn', 'Login failed');
      res.render('sessions/new', {locals: {
        redir: req.body.redir
      }});
    }
  })
});

require('./products');
var Products = db.model('products');


app.get('/products', requiresLogin, function(req, res) {
  Products.find().find(function(err, products) {
	  res.render('products/index', {locals: {
	  	products: products
	  }});
  });
});

app.get('/products/new', requiresLogin, function(req, res) {
	res.render('products/new', {locals: {
		product: req.body && req.body.product || new Products()
	}});
});

app.get('/products/:id', requiresLogin, function(req, res) {
  var product = Products.findById(req.params.id, function(err, product){
	  res.render('products/show', {locals: {
	  	product: product
	  }});
  });
});

app.get('/products/:id/edit', requiresLogin, function(req, res) {
  var product = Products.findById(req.params.id, function(err, product){
	  res.render('products/edit', {locals: {
	  	product: product
	  }});
  });
});

app.put('/products/:id', requiresLogin, function(req, res) {
	var id = req.params.id;
  Products.update({_id: id}, req.body.product, false, true);
  var product = Products.findById(req.params.id, function(err, product){
    res.redirect('/products/' + id);
  });
});

app.post('/products', requiresLogin, function(req, res) {
  var product = new Products(req.body.product);
  product.save();
	res.redirect('/products/' + product.id);
});

/* Photos */
app.get('/photos/new', requiresLogin, function(req, res) {
	res.render('photos/new');
});

app.post('/photos', requiresLogin, function(req, res) {
	req.setEncoding('binary');
	parser.headers = req.headers;
	var ws;

	parser.onPartBegin = function(part) {
		console.log('here');
		ws = fs.createWriteStream(__dirname + '/static/upload/photos/' + part.filename);
		ws.on('error', function(err) {
			throw err;
		})
	};
	
	parser.onData = function(data) {
		console.log('XXXXXXX data');
		ws.write(data);
	}
	
	parser.onPartEnd = function() {
		console.log('XXXXXXX end');
		ws.end();
		parser.close();
		res.send('File successfully uploaded.');
	}
	
	req.on('data', function(data) {
		console.log('XXXXXXX POST - WS');
		parser.write(data);
	});
});


app.listen(port);
