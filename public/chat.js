
//  let socket = io.connect('localhost:8023');
console.log('hello');

var person = prompt("Please enter your name:", "Mohit..");

// let socket = io.connect('http://localhost:3002/?person_name='+person);
let socket = io.connect('http://3.14.14.133:3002/?person_name='+person);

//Handel Frontend request

document.getElementById("send").addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    username: username.value,
    handle: person,
    IP: "123"
  });
});


socket.on('chat', function (data) {
  document.getElementById("output").innerHTML += '<br><strong>' + data.handle + '</strong> : ' + data.message;
});

socket.on('my', function (data) {
  document.getElementById("output").innerHTML += '<br><strong>' + 'Me: ' + '</strong> : ' + data.message;
});
