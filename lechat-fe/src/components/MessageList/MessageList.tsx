import React, { useState } from "react";
import "./MessageList.sass";
import socketService, {
  MESSAGE_TYPE,
  IChatMessage,
  IChatDumpMessage,
} from "../../services/socket";

export interface IMessageListProps {
  list: IChatMessage[];
}

const MessageList = (props: IMessageListProps) => {
  const renderedMessageList: JSX.Element[] = [];
  props.list.forEach((message) => {
    const messageClass = message.sender === socketService.id ? "mine" : "";
    const senderToken: string = (message.nickname
      ? message.nickname[0]
      : message.sender
      ? message.sender[0]
      : "?"
    ).toUpperCase();

    // todo random color per sender-image
    // ... e le impronte dei gatti? ;P

    renderedMessageList.push(
      <li
        id={"message" + Math.floor(Math.random() * 100)}
        className={messageClass}
      >
        <div className="sender-image">{senderToken}</div>
        <div className="message-content">
          <span className={"author"}>{message.nickname}</span>
          <span className={"body"}>{message.body}</span>
        </div>
      </li>
    );
  });

  return <ul className={"message-list"}>{renderedMessageList}</ul>;
};

export default MessageList;
