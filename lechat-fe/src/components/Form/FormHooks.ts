import {useState, FormEvent} from "react"
const DEFAULT_STATE = {'newMessage' : ''}

const useSendMessageForm = (callback: ( event: FormEvent<HTMLFormElement> | undefined) => any) => {
  const [inputs, setInputs] = useState(DEFAULT_STATE)

  const handleSubmit = (event: FormEvent<HTMLFormElement> | undefined ): void => {
    if (event) {
      event.preventDefault();
    }
    setInputs(DEFAULT_STATE)
    callback(event)
  }

  const handleInputChange = (event: any) => {
    event.persist();

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }
  
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}

export default useSendMessageForm;
