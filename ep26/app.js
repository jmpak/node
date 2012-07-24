var express = require('express'),
    everyauth = require('everyauth'),
    util = require('util'),
    Promise = everyauth.Promise;

var cradle = require('cradle');
//everyauth.debug = true;

var c = new cradle.Connection('jmpak.iriscouch.com', 80, {
  auth : { username: 'jmpak', password: 'password'}
});

var users = c.database('users');


everyauth.twitter
  .consumerKey('veb22qJD7Su0AsWnBNPkNQ')
  .consumerSecret('CE3dNWWRZL0BIh4bKkFEEsWrBbC3fjQe5rMVOANbM')
  .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData) {
    var promise = new this.Promise();
    var doc = {
       accessToken: accessToken,
       accessTokenSecret: accessTokenSecret,
       name: twitterUserData.name,
       twitterId: twitterUserData.id
    }
    promise.fulfill(doc);
    return promise;
  })
  .redirectPath('/');

var app = express.createServer();
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
  everyauth.helpExpress(app);
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(4000);
