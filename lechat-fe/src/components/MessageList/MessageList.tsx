import * as React from "react";
import './MessageList.sass'

export interface MessageList {
}

const MessageList = (props: MessageList) => <ul className={'message-list'}>
  <li>ciao</li>
  <li className="mine">ciao anche a te!</li>
</ul>

export default MessageList;
