var util = require('util');

exports.index = function(req, res) {
  res.send('products#index');
};

exports.get = function(req, res) {
  res.send('products#new');
};

exports.show = function(req, res) {
  res.send('products#show: ' + util.inspect(req.product));
};

exports.edit = function(req, res) {
  res.send('products#edit');
};

exports.update = function(req, res) {
  res.send('products#update');
};

exports.create = function(req, res) {
  res.send('products#create');
};

exports.load = function(id, callback) {
  callback(null, {id: id, name: "Product #" + id});
}

