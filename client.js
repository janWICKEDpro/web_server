const net = require('net');

let socket  = net.Socket();

socket.connect(5000);
socket.write('Hello');
socket.on('data', (data) =>{
    console.log(data.toString());
  
});
socket.end();