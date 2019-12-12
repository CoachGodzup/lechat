import React, {useState} from "react";
import './MessageList.sass'
import socketService, { MESSAGE_TYPE, ISocketMessage, IChatMessage, IChatDumpMessage } from "../../services/socket";

const DEFAULT_MESSAGE_LIST: IChatMessage[] = []
const MessageList = () => {

  const [messageArray, setMessageArray] = useState(DEFAULT_MESSAGE_LIST)
  const renderedMessageList: JSX.Element[] = []

  socketService.listen(MESSAGE_TYPE.RECEIVE, (msg: IChatMessage) => {
    setMessageArray([...messageArray, (msg)])
  })

  socketService.listen(MESSAGE_TYPE.LOGIN, (dump: IChatDumpMessage) => {
    setMessageArray([...dump.body])
  })

  messageArray.forEach(message => {
    const messageClass = message.sender === socketService.id ? 'mine' : '';
    const senderToken = message.sender ? message.sender[0] : '?';

    // todo random color per senderimage
    // ... e le impronte dei gatti? ;P

    renderedMessageList.push(<li 
      id={'message' + Math.floor(Math.random() * 100)} 
      className={messageClass}>
        <div className="senderImage">{senderToken}</div> 
        <span>{message.body}</span>
    </li>)
  })
  
  return (
    <ul className={'message-list'}>
      {renderedMessageList}
    </ul>
  )
}

export default MessageList;
