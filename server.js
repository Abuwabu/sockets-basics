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



// STATIC
app.use(express.static(__dirname + '/public'));


// LISTEN UP
http.listen(PORT, function(){
  console.log("Server started...");
});