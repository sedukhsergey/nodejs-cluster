const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
  const cpusCount = os.cpus().length;
  console.log('cpusCount',cpusCount)
  console.log('Master started PID', pid)
  for (let i = 0; i < cpusCount - 1; i++) {
    cluster.fork()
    // worker.send('Hello from server')
    // worker.on('message', msg => {
    //   console.log(`Worker sent message. His PID: ${msg}, expected PID: ${worker.process.pid}`)
    // })
  }
}
if (cluster.isWorker) {
  require('./worker.js')
  // process.on('message', (msg) => {
  //   console.log('Message from master, MSG:',msg)
  // })
  process.send(`Worker PID: ${process.pid}`)
}

cluster.on('exit', (worker) => {
  console.log(`Worker died! Pid: ${worker.process.pid}`);
  cluster.fork();
});

