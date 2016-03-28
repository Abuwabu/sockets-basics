/**
 * Express server routing for sockets
 * 
 * @author        Andrew Mead (butchered by Adam Tait)
 * @summary       Express server routing for sockets
 * 
 * @requires      express
 * @requires      module:db
 * 
 * @todo          refactor
 * @todo          JSDoc
 * @todo          select a room from dropdown
 * @todo          add remember-me functionality JWT
 * @todo          message permanence on refresh
 * @todo          secure — currently could send <script>alert("alert")</script>
 * @todo          add avatars
 * @todo          users have different colours to system (and maybe to each other)
 * @todo          add 'user is typing feature'
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

// Sends current users to provided socket
function sendCurrentUsers (socket) {
  var info = clientInfo[socket.id];
  var users = [];
  
  // don't search clientInfo for rooms that don't exist
  if (typeof info === 'undefined') {
    return;
  }
  
  Object.keys(clientInfo).forEach(function (socketId) {
    var userInfo = clientInfo[socketId];
    
    if (info.room === userInfo.room) {
      users.push(userInfo.name);
    }
  });
  
  socket.emit('message', {
    name: 'System',
    text: 'Current Users: ' + users.join(', '),
    timestamp: moment().valueOf()
  });
}



// LISTEN UP
io.on('connection', function(socket) {
  console.log("User connected via socket.io!");
  
  socket.on('disconnect', function () {
    var userData = clientInfo[socket.id];
    
    if (typeof userData !== 'undefined') {
      socket.leave(userData.room);
      io.to(userData.room).emit('message', {
        name: 'System',
        text: userData.name + " has left!",
        timestamp: moment().valueOf()
      });
      
      delete clientInfo[socket.id];
    }
  });
  
  socket.on('joinRoom', function (req) {
    clientInfo[socket.id] = req;
    socket.join(req.room);
    socket
      //sends to all users except sender
      .broadcast.to(req.room)
      .emit('message', {
        name: 'System',
        text: req.name + " has joined!",
        timestamp: moment().valueOf()
      });
  });

  socket.on('message', function (message) {
    console.log("Message received: " + message.text);
    
    if (message.text === '@currentUsers') {
      sendCurrentUsers(socket);
    } else {
      message.timestamp = moment().valueOf();
      
      // io.emit — to send to all users
      io.to(clientInfo[socket.id].room).emit('message', message);
    }
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
