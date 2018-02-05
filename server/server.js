const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
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

	// emitting events from the current socket passing payload to the server
	socket.emit('newMessage', {
		from: 'servermail@server.com',
		text: 'Hi there!',
		createdAt: 123123
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage emitted from the client: ', message);
	});

	// listening for client events
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(port, () => {
	console.log(`Server is up on port: ${port}`);
});