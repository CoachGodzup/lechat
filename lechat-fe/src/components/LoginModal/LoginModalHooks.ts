import {useState, FormEvent} from "react"
const DEFAULT_STATE = {
  'nickname' : '',
  'hide': false
}

const useLoginForm = (callback: ( event?: FormEvent<HTMLFormElement>) => any) => {
  const [inputs, setInputs] = useState(DEFAULT_STATE)

  const loginHandler = (event: FormEvent<HTMLFormElement> | undefined ): void => {
    if (event) {
      event.preventDefault();
    }
    const newState = {
      ...DEFAULT_STATE,
      hide: true
    }

    setInputs(newState)
    callback(event)
  }

  const inputChangeHandler = (event: any) => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }
  
  return {
    loginHandler,
    inputChangeHandler,
    inputs
  };
}

export default useLoginForm;
