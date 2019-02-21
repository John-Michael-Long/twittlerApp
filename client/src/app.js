// var io = require('socket.io');
// const io = require('socket.io-client');
  // import io from 'socket.io-client';
var host = 'http://localhost:3000'

window.onload = function() {

  // Get references to elements on the page.

  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  // var closeBtn = document.getElementById('close');


  // no need to specify any URL when calling io(), since it defaults to trying to connect to the host that serves the page.
  var socket = io(host);

  // Send a message when the form is submitted.
  form.onsubmit = function(e) {
    e.preventDefault();

    var message = messageField.value;
    socket.emit('new-client-msg', message);
    messageField.value = '';

    return false; //why do we return false here????
  };

  socket.on('connect', function() {
    console.log('event: ', socket.id)
    socketStatus.innerHTML = `Connected to: ${host}. Socket-ID: ${socket.id}`;
    socketStatus.className = 'open';
  });


  // Handle messages sent by the server.
  socket.on('new-server-msg', function(msg) {
    messagesList.innerHTML += '<li class="received"><span>Received: </span>' +  msg + '</li>';
    console.log('new-server-msg: ', msg)
  });

  // Close the WebSocket connection when the close button is clicked.
  // closeBtn.onclick = function(e) {
  //   e.preventDefault();
  //   // Close the WebSocket.
  //   socket.close();
  //   return false;
  // };

  // Show a disconnected message when the WebSocket is closed.
  // socket.onclose = function(event) {
  //   socketStatus.innerHTML = 'Disconnected from WebSocket.';
  //   socketStatus.className = 'closed';
  // }

};


// $(function () {
//   var socket = io('http://localhost:3000');  
//   $('form').submit(function(){
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });
//   socket.on('chat message', function(msg){
//     $('#messages').append($('<li>').text(msg));
//     window.scrollTo(0, document.body.scrollHeight);
//   });
// });


      

