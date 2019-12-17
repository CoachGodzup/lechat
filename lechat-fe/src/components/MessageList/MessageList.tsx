import React, {useState} from "react";
import './MessageList.sass'
import socketService, { MESSAGE_TYPE, IChatMessage, IChatDumpMessage } from "../../services/socket";

const DEFAULT_MESSAGE_LIST: IChatMessage[] = []
const MessageList = () => {

  const [messageArray, setMessageArray] = useState(DEFAULT_MESSAGE_LIST)
  const renderedMessageList: JSX.Element[] = []

  socketService.listen(MESSAGE_TYPE.RECEIVE, (msg: IChatMessage) => {
    setMessageArray([...messageArray, (msg)])
  })

  socketService.listen(MESSAGE_TYPE.CONFIRM_LOGIN, (dump: IChatDumpMessage) => {
    setMessageArray([...dump.body])
  })

  messageArray.forEach(message => {
    const messageClass = message.sender === socketService.id ? 'mine' : '';
    const senderToken: string = (message.nickname ? message.nickname[0] :
      message.sender ? message.sender[0] : '?').toUpperCase();

    // todo random color per sender-image
    // ... e le impronte dei gatti? ;P

    renderedMessageList.push(<li 
      id={'message' + Math.floor(Math.random() * 100)} 
      className={messageClass}>
        <div className="sender-image">{senderToken}</div> 
        <div className="message-content">
          <span className={"author"}>{message.nickname}</span>
          <span className={"body"}>{message.body}</span>
        </div>
    </li>)
  })
  
  return (
      <ul className={'message-list'}>
        {renderedMessageList}
      </ul>
  )
}

export default MessageList;
