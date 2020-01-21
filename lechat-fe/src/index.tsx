import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass'
import Nav from './components/Nav/Nav'
import MessageList from './components/MessageList/MessageList'
import Footer from './components/Footer/Footer'

import * as serviceWorker from './serviceWorker';
import MessageForm from './components/Form/Form';
import LoginModal from './components/LoginModal/LoginModal';
import socketService from './services/socket';
import ContactContainer from './containers/Contacts/ContactContainer';
import MessageContainer from './containers/Message/MessageContainer';

ReactDOM.render(
  <div className='body'>
    <LoginModal title={'🐱 Benvenuto'}></LoginModal>
    <Nav title={'🐱 Le Chat'} subtitle={'A super simple chat app'}></Nav>
    <aside>
      <ContactContainer></ContactContainer>
    </aside>
    <section>
      <MessageContainer></MessageContainer>
      <MessageForm></MessageForm>
    </section>
    <Footer disclaimer={'Made with 🐾 with Socket.io'}></Footer>
  </div>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
