const express = require('express');
const APP = express();
const socket = require('socket.io');


APP.use(express.static('public'));

const SERVER = APP.listen(8023, function () {
  console.log("App is running on port number : 8023");
});


const io = socket(SERVER);
io.on('connection', function (socket) {
  
  
  socket.join(socket.handshake.query.person_name);
  
  socket.on('chat', function (data) {
    socket.emit('my',data);  
    console.log(data);
    console.log(data.username);    
        
    socket.to(data.username).emit('chat',data); 
  });

  socket.on('disconnect', function () {
    console.log("User disconnected with address: " + socket.handshake.address)
  })
});