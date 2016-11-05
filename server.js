var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888);

app.get('/dist/build.js', function(req, res) {
    res.sendFile(__dirname + '/dist/build.js');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log(socket.id, 'connected');
    socket.on('join', function (data) {
        console.log(socket.id, 'joined', data);
        socket.broadcast.emit('message', {nickname: 'SERVER', message: data.nickname + ' joined!'})
        socket.emit('joined');
    });
    socket.on('message', function (data) {
        console.log(socket.id, data);
        socket.broadcast.emit('message', data);
    });
});
