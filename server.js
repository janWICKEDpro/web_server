const  net= require('net');
const PORT = 5000;
const onClientConnected = require('./client_connections');
const ADDRESS = '127.0.0.1';

let server = net.createServer(onClientConnected);
server.listen(PORT);

console.log('listening to connections');
