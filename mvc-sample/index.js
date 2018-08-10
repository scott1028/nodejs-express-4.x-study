/**
 * Module dependencies.
 */

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;  // 當然你也可以指定數量(超過 CPU Cores)

const main = require('./app.js');

var mode = 'development';

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if(val === 'production')
    mode = 'production';
});

if(mode === 'development'){
  main(module);
}
else{
  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    main(module);
  };
};
