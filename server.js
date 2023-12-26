const  net= require('net');

const PORT = 5000;
const ADDRESS = '127.0.0.1';

let server = net.createServer(onClientConnected);

server.listen(PORT);

console.log('listening');

function onClientConnected(socket){
    console.log(`New client: ${socket.remoteAddress}  `);
    
    socket.on('data', (data) =>{
            console.log(data.toString());
          const  requestData = data.toString().split('\n')[0].split(' ')[1];
          const message = `HTTP/1.1 200 OK\r\n\r\nRequested path: ${requestData}\r\n`
            var response = [
                'HTTP/1.1 200 OK',
                'Content-Type: text/plain',
               `Content-Length: ${message.length}`,
                '',
                message
              ].join('\r\n');
            socket.write(response);
    });

   
    socket.on('end', () => {
        console.log(`client disconnected`);
    });
}
