const express = require('express');
const APP = express();
const socket = require('socket.io');


APP.use(express.static('public'));

const SERVER = APP.listen(3002, function () {
  console.log("App is running on port number : 3002");
});


const io = socket(SERVER);
io.on('connection', function (socket) {
  
  
  socket.join(socket.handshake.query.person_name); //joining Room
  
  socket.on('chat', function (data) {

    socket.emit('my',data);  //to self
    if(data.username)
      socket.to(data.username).emit('chat',data); //emit message to room
    else
      socket.broadcast.emit('chat',data)
  });

  socket.on('disconnect', function () {
    console.log("User disconnected with address: " + socket.handshake.address)
  })
});