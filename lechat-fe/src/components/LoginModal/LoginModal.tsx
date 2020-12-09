import * as React from "react";
import css from './LoginModal.module.sass'
import useLoginForm from "./LoginModalHooks";
import socketService, { MESSAGE_TYPE } from "../../services/socket";
import authService from "../../services/auth";

export interface LoginModalProps {
  title: string;
}

const LoginModal = (props: LoginModalProps) => {
  const loginCallback = (event?: React.FormEvent<HTMLFormElement>):void => {
    socketService.nickname = inputs.nickname;
    socketService.emit(MESSAGE_TYPE.ATTEMPT_LOGIN, socketService.nickname)
    authService.setUserLoggedIn(socketService.nickname);
  }
  
  if(authService.isUserLoggedIn()) {
    socketService.nickname = authService.getUserLoggedIn() || '';
  }

  const {inputs, inputChangeHandler, loginHandler} = useLoginForm(loginCallback);

  return (
  <form onSubmit={ loginHandler } className={ inputs.hide ? 'hide' : '' }>
    <div className={css.ModalBackground}></div>
    <div className={css.Modal}>
      <div className={'modal-header'}>
        {props.title}
      </div>
      <div className={'modal-body'}>
        <div className="input-group">
          <input 
            name="nickname"
            type="text" 
            placeholder="nickname"
            onChange={ inputChangeHandler }
            value={ inputs.nickname }
          />
        </div>
      </div>
      <div className={'modal-action'}>
        <button type="submit"> <span role="img" aria-label="paw">🐾</span> Entra</button>
      </div>
    </div>
  </form>
  )
}

export default LoginModal;
