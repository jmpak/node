var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
  'login': {type : String, index : true},
  'password': {type : String, index : true},
  'role': String
});

Users.static('authenticate', function(login, password) {
  return this.find({login: login, password: password});
});

mongoose.model('users', Users);
