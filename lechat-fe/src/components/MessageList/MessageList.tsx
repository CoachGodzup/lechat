import React, {useState} from "react";
import './MessageList.sass'
import socketService, { MESSAGE_TYPE, ISocketMessage } from "../../services/socket";

const DEFAULT_MESSAGE_LIST: ISocketMessage[] = []
const MessageList = () => {

  const [messageArray, setMessageArray] = useState(DEFAULT_MESSAGE_LIST)
  const renderedMessageList: JSX.Element[] = []

  socketService.listen(MESSAGE_TYPE.RECEIVE, (msg: ISocketMessage) => {
    setMessageArray([...messageArray, (msg)])
  })

  messageArray.forEach(message => {
    const messageClass = message.sender === socketService.id ? 'mine' : '';    
    renderedMessageList.push(<li id={'message' + Math.floor(Math.random() * 100)} className={messageClass}>{message.body}</li>)
  })
  
  return (
    <ul className={'message-list'}>
      <li>ciao</li>
      <li className="mine">ciao anche a te!</li>
      {renderedMessageList}
    </ul>
  )
}

export default MessageList;
