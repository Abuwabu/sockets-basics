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


// ALL THE TIME
var moment = require('moment');


// STATIC
app.use(express.static(__dirname + '/public'));


// CLIENT DATA
var clientInfo = {};



// LISTEN UP
io.on('connection', function(socket) {
  console.log("User connected via socket.io!");
  
  socket.on('joinRoom', function (req) {
    clientInfo[socket.id] = req;
    socket.join(req.room);
    socket
      .broadcast.to(req.room)
      .emit('message', {
        name: 'System',
        text: req.name + " has joined!",
        timestamp: moment().valueOf()
      });
  });

  socket.on('message', function (message) {
    console.log("Message received: " + message.text + " at: " + message.timestamp);
    
    // io.emit — to send to all
    io.to(clientInfo[socket.id].room).emit('message', message);
    
    //sends to all users except sender
    // socket.broadcast.emit('message', message);
  });
  
  // message is a custom name
  // only get one argument — so use an object.
  socket.emit('message', {
    name: 'System',
    text: 'Welcome to the Chat Application!',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function(){
  console.log("Server started...");
});
