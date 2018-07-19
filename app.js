const express = require('express');
const app = express();


app.use(express.static(__dirname + "/public"));
const server = app.listen(8000);


const io = require('socket.io')(server);

let counter = 0;

io.on('connection', function(socket) {
    socket.emit('connection', {msg: "Hello", counter: counter});
    socket.on('click', function(data) {
        counter += data;
        io.emit('update', {counter: counter});
    })
    socket.on('reset', function() {
        counter = 0;
        io.emit('update', {counter: counter});
    })
});