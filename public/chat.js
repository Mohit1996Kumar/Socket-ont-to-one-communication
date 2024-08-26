
//  let socket = io.connect('localhost:8023');
console.log('hello');

var auth_token = prompt("Please enter your name:", "Mohit..");

// let socket = io.connect('http://localhost:3002/?person_name='+person);
let socket = io.connect('http://localhost:3001/?token='+auth_token);
socket.emit('join', {
  authentication: auth_token
});


//Handel Frontend request
socket.on('connectionSuccess',(data)=>{
  console.log('connectionSuccess: ',data)
  socket.emit('listChats',{
    token: auth_token
  })
})

//Handel Frontend request
socket.on('error',(error)=>{
  console.log('Error: ',error)
})

//Handel Frontend request
socket.on('listChats',(data)=>{
  console.log('listChats: ',data)
})

//Handel Frontend request
socket.on('newMessage',(data)=>{
  console.log('listChats: ',data)
})


socket.on('authentication_error',(error)=>{
  console.log('Authentication Failed: ',error)
})

document.getElementById("send").addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    username: username.value,
    handle: person,
    IP: "123"
  });
  document.getElementById("message").value = "";
});


socket.on('chat', function (data) {
  document.getElementById("output").innerHTML += '<br><strong>' + data.handle + '</strong> : ' + data.message;
});

socket.on('my', function (data) {
  document.getElementById("output").innerHTML += '<br><strong>' + 'Me: ' + '</strong> : ' + data.message;
});
