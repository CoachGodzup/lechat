import * as React from "react";
import './MessageForm.sass';

export interface MessageForm {
}

const MessageForm = (props: MessageForm) => <form>
  <input type="text" name="newMessage" id="newMessage"/>
  <button type="submit">Invia</button>
</form>

export default MessageForm;
