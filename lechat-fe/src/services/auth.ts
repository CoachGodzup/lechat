import socketService, { MESSAGE_TYPE } from "./socket"
import cookieService from "./cookie";

const DEFAULT_LOGIN_COOKIE_EXPIRATION_DATE = 1;
const LOGIN_COOKIE_NAME = 'user';

export interface IUser {
  socketId: string;
  nickname: string;
}

class AuthService {
  user = '';

  isUserLoggedIn() : boolean {
    return Boolean(this.getUserLoggedIn());
  }

  getUserLoggedIn(): string|null {
    return cookieService.getCookieByName(LOGIN_COOKIE_NAME);
  }

  setUserLoggedIn(nickname: string) {
    cookieService.setCookie({
      name: LOGIN_COOKIE_NAME,
      value: nickname
    });
  }

  login(nickname: string) {
    socketService.emit(MESSAGE_TYPE.ATTEMPT_LOGIN, nickname);
    cookieService.setCookie({
      name: LOGIN_COOKIE_NAME, 
      value: nickname
    });
    this.user = nickname;
  }
}

const authService = new AuthService()

export default authService