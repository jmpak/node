var kue = require('kue'),
    jobs  = kue.createQueue();

jobs.process('email', function(job, done) {
  console.log(job.data);
  setTimeout(function() {
    console.log('sent email');
    done();
  }, 10);  
});
