var util = require('util');

exports.index = {
  xml: function(req, res) {
    res.send('xml');
  },
  
  json: function(req, res) {
    res.send('json');
  }
}

exports.get = function(req, res) {
  res.send('forums#new');
};

exports.show = function(req, res) {
  res.send('forums#show: ' + util.inspect(req.product) + ' ' + util.inspect(req.forum));
};

exports.edit = function(req, res) {
  res.send('forums#edit');
};

exports.update = function(req, res) {
  res.send('forums#update');
};

exports.create = function(req, res) {
  res.send('forums#create');
};

exports.load = function(id, callback) {
  callback(null, {id: id, name: "Forums #" + id});
}

