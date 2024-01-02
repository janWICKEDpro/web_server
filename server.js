const  net= require('net');
const path= require('path');
const fileAccess = require('fs');
const { dir, log } = require('console');
const PORT = 5000;
// const onClientConnected = require('./client_connections');
const ADDRESS = '127.0.0.1';
let fileNames = [];
function main(){
    let server = net.createServer((socket)=>{
        socket.on('data',  async (data) =>{
            console.log(data.toString());
           const  requestData = data.toString().split('\n')[0].split(' ')[1];
          let message = '';
        const requestDataPath = path.join(__dirname, '/www');

        let isFileInDir = await  isInServerDirectory(requestData, requestDataPath);
       
     if(fileNames.includes(requestData.split('/').slice(-1)[0])){
        fileAccess.readFile(requestData == '/'? './www/index.html': `./www${requestData}`, 'utf-8', (err, result)=>{
            if(err){
             message = `HTTP/1.1 404 Not Found \r\n`; 
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
      
        message = `HTTP/1.1 404 Not Found \r\n`; 
                          
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
    });
    server.listen(PORT);
    
    console.log('listening to connections');
}

main();
 
 function isInServerDirectory(fileName,dir){
   return  new Promise((resolve, reject)=> {
    fileAccess.readdir(dir, {withFileTypes: true}, (err,files)=>{
        if(err){
            console.log(err);
           reject(err);
           return;
        }
    files.forEach(file => {
        if(file.isFile()){
            console.log(file.name);
            console.log(fileName.split('/').slice(-1)[0]);
            fileNames.push(file.name);
        }else{
        isInServerDirectory(fileName,path.join(dir, file.name))
        }
    });
   resolve();
});
   });
   
   
}
