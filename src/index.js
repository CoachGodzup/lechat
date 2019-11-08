const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = 3000

// serving page
app.get('/', (req, res) => {
  res.sendFile(__dirname + `/assets/index.html`)
})

// socket io chat managing
io.on('connection', (socket) => {
  console.log(`user with ${socket.client.id} logged in`)

  socket.on('message', (msg) => {
    console.log(`message from ${socket.client.id}: ${msg}`)
    io.emit('message', msg)
  })

  socket.on('disconnect', () => {
    console.log(`user with ${socket.client.id} logged out`)
  })
})

// starting up server
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})