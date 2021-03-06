var EventEmitter = require('events').EventEmitter;

var Adder = function(a, b) {
  var that;
  function coalesce() {
    if(! a) { a = 0; }
    if(! b) { b = 0; }
  }
  
  function add() {
    coalesce();
    that.emit('add', a, b);
    return a + b;
  };

  that = {
    add : add
  }

  that.__proto__ = EventEmitter.prototype;

  return that;

};

module.exports = Adder;
