import React, {useState, FormEvent} from "react"
import './Form.sass'
import * as socketService from '../../services/socket'
import useSendMessageForm from './FormHooks'

export interface MessageForm {
}

const Form = (props: MessageForm) => {
  const sendMessage = ():void => {
    socketService.default.send(inputs.newMessage);
  }

  const {inputs, handleInputChange, handleSubmit} = useSendMessageForm(sendMessage);

  return (
  <form onSubmit={ handleSubmit }>
    <input type="text" 
      name="newMessage"
      id="newMessage"
      onChange={handleInputChange} 
      value={inputs.newMessage}/>
    <button type="submit">Invia</button>
  </form>
)}

export default Form;
 