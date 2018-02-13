const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

var app = express();

// creating server with http library
// the same method created under the scenes by express when is invoked app.use()
// so it is possibile to pass app as argument
var server = http.createServer(app);

// integrating socket.io into the server
// is now possible to communicate from client to server and viceversa 
var io = socketIO(server);

app.use(express.static(publicPath));

// listening for events on current 'socket' connected to the server
io.on('connection', (socket) => {
	console.log('New user connected!');

	// emitting events from the current socket (single connection) passing payload to the server
	// socket.emit('newMessage', {
	// 	from: 'servermail@server.com',
	// 	text: 'Hi there!',
	// 	createdAt: 123123
	// });

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message) => {
		
		// console.log('createMessage emitted from the client: ', message);	

		// emitting event for every single connection, every time a single connection emits createMessage the server will show it to everybody
		io.emit('newMessage', generateMessage(message.from, message.text));

		// emitting event to everybody but individual socket, everybody but me can see it.
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});



	// listening for client events
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(port, () => {
	console.log(`Server is up on port: ${port}`);
});