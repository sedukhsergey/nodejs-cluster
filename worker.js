const http = require('http');

const pid = process.pid;
http.createServer((req, res) => {
    for (let i = 0; i <= 1e7; i++) {}
    res.end('Hello world \n')
}).listen(8800, () => {
    console.log(`Server started. Pid: ${pid}`,)
})
