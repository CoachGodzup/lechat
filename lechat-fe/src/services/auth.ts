import socketService, { MESSAGE_TYPE } from "./socket"

export interface IUser {
  socketId: string;
  nickname: string;
}

class AuthService {
  login(nickname: string) {
    socketService.emit(MESSAGE_TYPE.ATTEMPT_LOGIN, nickname);
  }
}

const authService = new AuthService()

export default authService