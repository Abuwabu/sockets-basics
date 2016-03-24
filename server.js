/**
 * Express server routing for sockets
 * 
 * @author        Andrew Mead (butchered by Adam Tait)
 * @summary       Express server routing for sockets
 * 
 * @requires      express
 * @requires      module:db
 */


// SERVER SETUP
var express = require('express');
var app = express();
var http = require('http').Server(app);
var PORT = process.env.PORT || 3000;
var io = require('socket.io')(http);


// STATIC
app.use(express.static(__dirname + '/public'));


// LISTEN UP
io.on('connection', function(socket) {
  console.log("User connected via socket.io!");
  
  socket.on('message', function (message) {
    console.log("Message received: " + message.text);
    socket.broadcast.emit('message', message);
  });
  
  // message is a custom name
  // only get one argument — so use an object.
  socket.emit('message', {
    text: "Welcome to the Chat Application!"
  });
});

http.listen(PORT, function(){
  console.log("Server started...");
});