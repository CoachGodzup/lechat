const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = 3000

const users = {}
const messageCache = []

// serving page
app.get('/', (req, res) => {
  res.sendFile(__dirname + `/assets/index.html`)
})

// socket io chat managing
io.on('connection', (socket) => {
  console.log(`user with ${socket.client.id} logged in`)
  io.to(socket.id).emit('login', {
    messageCache: messageCache || []
  })
  // socket.on('login', (nickname) => {
  //   users[socket.client.id] = {
  //     nickname      
  //   };
  // })

  socket.on('message', (msg) => {

    console.log(`message from ${socket.client.id}: ${msg}`)
    io.emit('message', msg)
    messageCache.push(msg)
  })

  socket.on('disconnect', () => {
    console.log(`user with ${socket.client.id} logged out`)
  })
})

// starting up server
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})
