import './styles/main.scss'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')
const form = document.getElementById('messageForm')
const input = document.getElementById('m')

let nickname = 'anonymous' + parseInt(Math.random() * 100)
const nicknameForm = document.getElementById('nicknameForm')

const createNewMessage = (msg) => {
  const messageList = document.getElementById('messageList')
  const newMessage = document.createElement('li')
  if(isMine(msg)) {
    newMessage.classList.add('mine')
  }

  newMessage.innerHTML += '<div class="nickname">' + msg.body.nickname + '</div>'
  newMessage.innerHTML += '<div class="message">' + msg.body.message + '</div>'

  messageList.append(newMessage)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  socket.emit('message', {
    nickname,
    message: input.value
  })
  input.value = ''
})

// nicknameForm.addEventListener('submit', () => {
//   event.preventDefault()
//   socket.emit('login', nickname)
// })

socket.on('refresh', (info) => {
  info.messageCache.forEach(msg => createNewMessage(msg))
})

socket.on('message', (msg) => {
  createNewMessage(msg)
})

const isMine = (msg) => {
  return msg.body.nickname === nickname 
}
