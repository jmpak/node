var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Products = new Schema({
  'name': {type : String, index : true},
  'description': String,
  'price': Number
})

mongoose.model('products', Products);

