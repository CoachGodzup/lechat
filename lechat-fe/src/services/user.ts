import { SocketService, MESSAGE_TYPE } from "./socket";

interface IUser {
  id: string
  nick: string
}

export class UserService {
  private user: IUser

  constructor(private socketService: SocketService){
    this.user = {
      id: socketService.socket,
      nick: ''
    }
  }

  set nick(nick: string) {
    this.user.nick = nick
  }

  login() {
    this.socketService.send({
      type: MESSAGE_TYPE.LOGIN,
      body: this.user
    });
  }

  logout() {
    this.socketService.send({
      type: MESSAGE_TYPE.LOGOUT,
      body: this.user
    });
  }
}