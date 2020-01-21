import React, {useState} from 'react';
import withSocket from '../../hoc/withSocket';
import MessageList from '../../components/MessageList/MessageList';
import socketService, { IChatMessage, MESSAGE_TYPE, IChatDumpMessage } from '../../services/socket';

const DEFAULT_MESSAGE_LIST: IChatMessage[] = [];

const MessageContainer = (props: any) => {

  const [messageArray, setMessageArray] = useState(DEFAULT_MESSAGE_LIST);

  socketService.listen(MESSAGE_TYPE.RECEIVE, (msg: IChatMessage) => {
    setMessageArray([...messageArray, (msg)]);
  })

  socketService.listen(MESSAGE_TYPE.CONFIRM_LOGIN, (dump: IChatDumpMessage) => {
    setMessageArray([...dump.body]);
  })

  return (<MessageList list={messageArray}></MessageList>)
}

export default withSocket(MessageContainer);