var kue = require('kue'),
    jobs  = kue.createQueue();

var sequence = 0;

setInterval(
  function() {
    sequence += 1;
    (function(sequence) {
      var job = jobs.create('email', {
        title : 'Hello',
        to: 'dd@dd.com',
        body: 'Hello from Node Tuts!'
      }).save();
      
      job.on('complete', function(){
        console.log('job ' + sequence + ' completed!');
      });
  
      job.on('failed', function(){
        console.log('job ' + sequence + ' completed!');
      });
    })(sequence);
  }
, 1000);
