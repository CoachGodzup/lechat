import React, { useState } from "react";
import css from './ContactList.module.sass'
import socketService from "../../services/socket";
import Contact, { ContactProps } from "./Contact/Contact";

export interface ContactListProps {
  list: ContactProps[]
}

const ContactList = (props: ContactListProps) => {

  const myselfPlaceholder = <li className='myself'>
    {socketService.nickname || 'non collegato'}
  </li>
  
  return (
    <ul className={css.contactList}>
      <li>Contact List funziona</li>
      {myselfPlaceholder}
      {props.list.map(c => 
        <Contact name={c.name} key={Math.random()}/>
      )}

    </ul>
  )
}

export default ContactList