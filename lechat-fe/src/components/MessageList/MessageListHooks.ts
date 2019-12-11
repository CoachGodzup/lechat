import {useState} from 'react'

const useUpdateMessage = (callback: (event: Event | undefined) => any) => {
  const [message, setMessage] = useState({'messageList': []})

  const handleMessage = (event: Event | undefined): void => {
    if(event) {
      event.preventDefault();
    }
    console.log('received!');
    callback(event);
  }

  return {
    handleMessage,
    message
  }

}