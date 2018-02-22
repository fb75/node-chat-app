//initializing request after loading socket.io and opening connections
var socket = io();	

// listening on built-in connect e disconnect event
socket.on('connect', function () {
	console.log('Connected to the server');

	// socket.emit('createMessage', {
	// 	to: 'myMail@example.com',
	// 	text: 'Hello this is a message from some client'
	// });
});

socket.on('disconnect', function () {
	console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
	console.log('New message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

// emitting event using callback as second parameter for data acknowledgement to the server 
// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi!'
// }, function(data) {
// 	console.log('Got it', data);
// });

// using jQuery to override the submit event(page refresh by default)
jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});