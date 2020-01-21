import React from 'react'
import css from './Contact.module.sass'

export interface ContactProps {
  name: string;
  isSelf?: boolean;
}

const Contact = (props: ContactProps) => {

  const initial = props.name[0];

  return <li className={css.Wrapper}>
      <div className={css.Bubble}>{initial}</div>
      <span className={css.CName}>{props.name}</span>
      <span className={css.CStatus}>online</span>
    </li>
}

export default Contact;