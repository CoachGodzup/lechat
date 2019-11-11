import './styles/main.scss'

import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000');

const form = document.getElementById('messageForm')
const input = document.getElementById('m')

const createNewMessage = (msg) => {
  const messageList = document.getElementById('messageList');
  const newMessage = document.createElement('li')
  newMessage.innerText = msg;
  messageList.append(newMessage)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  socket.emit('message', input.value)
  input.value = ''
})

socket.on('login', (info) => {
  info.messageCache.forEach(msg => createNewMessage(msg))
})

socket.on('message', (msg) => {
  createNewMessage(msg);
})
