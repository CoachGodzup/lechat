import { useState, FormEvent } from "react";

const useContactList = (callback: ( event?: FormEvent<HTMLFormElement>) => any) => {
  const [myself, setMyself] = useState();
  const [contactList, setContactList] = useState([])
  
  return {
    myself,
    setMyself,
    contactList,
    setContactList,
  };
}

export default useContactList;
