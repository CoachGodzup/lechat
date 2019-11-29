import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass'
import Nav from './components/Nav/Nav'
import MessageList from './components/MessageList/MessageList'
import Footer from './components/Footer/Footer'

import * as serviceWorker from './serviceWorker';
import MessageForm from './components/MessageForm/MessageForm';

ReactDOM.render(
  <div className='body'>
    <Nav title={'🐱 Le Chat'} subtitle={'A super simple chat app'}></Nav>
    <aside>Step aside!</aside>
    <section>
      <MessageList></MessageList>
      <MessageForm></MessageForm>
    </section>
    <Footer disclaimer={'Made with 🐾 with Socket.io'}></Footer>
  </div>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
