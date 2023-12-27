const threads = require('worker_threads');

const fileAccess = require('fs');


module.exports = function onClientConnected(socket){
 
    console.log(`New client: ${socket.remoteAddress}  `);   
    if(threads.isMainThread) {
      const worker = new threads.Worker(__filename);
      worker.on('message', (message) => {
        console.log('ThreadInfo: \n', message);
      });
                                                                   
      worker.on('error', (error) => {
        console.error('Worker error:', error);
      });
    
      worker.on('exit', (code) => {
        console.log('Worker thread exited with code:', code);
      });
    }else{
        socket.on('data',  (data) =>{
        console.log(data.toString());
        console.log('adfasdfasdfh adf')
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
      threads.parentPort.postMessage(`Path: ${requestData} \n ThreadId: ${threads.threadId}`)
    });
    
    
    socket.on('end', () => {
    console.log(`client disconnected`);
    });
    }
  

    
  }
