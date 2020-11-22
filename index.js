var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var connected_users = 0

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html', {token: connected_users});
});

io.on('connection', (socket) => {
    connected_users += 1;
    io.emit('counter_changed', connected_users);
    console.log('a user connected:', connected_users);

    socket.on('disconnect', () => {
        connected_users -= 1
        io.emit('counter_changed', connected_users);
        console.log('a user disconnected:', connected_users);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
