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
io.on('connection', function() {
  console.log("User connected via socket.io!");
});

http.listen(PORT, function(){
  console.log("Server started...");
});