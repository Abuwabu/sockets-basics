var room = getQueryVariable('room');
var name = getQueryVariable('name') || 'Anonymous';
var socket = io();

console.log(name + " wants to join " + room);

function localTime (timestamp) {
  var timestampMoment = moment.utc(timestamp);
  return timestampMoment.local().format('h:mm a');
}

jQuery('.room-title').text(room);

socket.on('connect', function () {
  console.log("Connected to socket.io server!");
  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

// Fires every time a new message comes in
socket.on('message', function (message) {
  var $message = jQuery('<li class="list-group-item"></li>');
  
  console.log("New message: " + message.text);
  
  $message
    .append('<p><strong>' + message.name + ' ' + localTime(message.timestamp) + '</strong></p>')
    .append('<p>' + message.text + '</p>');
  jQuery('.messages').append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
  var $message = $form.find('input[name=message]');
  
  //don't refresh entire page on submission
  event.preventDefault();
  
  socket.emit('message', {
    name: name,
    text: $message.val()
  });
  
  $message.val('');
});
