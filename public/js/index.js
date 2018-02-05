//initializing request after loading socket.io and opening connections
var socket = io();	

// listening on built-in connect e disconnect event
socket.on('connect', function () {
	console.log('Connected to the server');

	socket.emit('createMessage', {
		to: 'myMail@example.com',
		text: 'Hello this is a message from some client'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from the server');
});

socket.on('newMessage', function(message) {
	console.log('New message', message);
});