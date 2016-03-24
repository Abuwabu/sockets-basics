var socket = io();

socket.on('connect', function () {
  console.log("Connected to socket.io server!");
});


socket.on('message', function (message) {
  console.log("New message: " + message.text);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
  var $message = $form.find('input[name=message]');
  //don't refresh entire page on submission
  event.preventDefault();
  
  socket.emit('message', {
    text: $message.val()
  });
  
  $message.val('');
});