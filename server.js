const  net= require('net');
const fileAccess = require('fs');

const PORT = 5000;
const ADDRESS = '127.0.0.1';

let server = net.createServer(onClientConnected);

server.listen(PORT);

console.log('listening to connections');

async function onClientConnected(socket){
    console.log(`New client: ${socket.remoteAddress}  `);
    
    socket.on('data',  (data) =>{
            console.log(data.toString());
          const  requestData = data.toString().split('\n')[0].split(' ')[1];
          
          
          let message = '';
          if(requestData == '/' || '/index.html'){
        fileAccess.readFile('index.html', 'utf-8', (err, result)=>{
                if(err){
                    message = `HTTP/1.1 400 Not Found \r\n`; 
                      
            var response = [
                'HTTP/1.1 200 OK',
                'Content-Type: text/plain',
               `Content-Length: ${message.length}`,
                '',
                message
              ].join('\r\n');
            socket.write(response);
                    return;
                }
                message =  `HTTP/1.1 200 OK\r\n\r\n ${result}\r\n`;
                  
            var response = [
                'HTTP/1.1 200 OK',
                'Content-Type: text/plain',
               `Content-Length: ${message.length}`,
                '',
                message
              ].join('\r\n');
            socket.write(response);
                return result;
            });
            
          }else{
            message = `HTTP/1.1 400 Not Found \r\n`; 
              
            var response = [
                'HTTP/1.1 200 OK',
                'Content-Type: text/plain',
               `Content-Length: ${message.length}`,
                '',
                message
              ].join('\r\n');
            socket.write(response);
          }
        
    });

   
    socket.on('end', () => {
        console.log(`client disconnected`);
    });
}
