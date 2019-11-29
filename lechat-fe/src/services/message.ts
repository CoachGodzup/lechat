import { SocketService, MESSAGE_TYPE } from "./socket";

interface IMessage {
  body: string
}

export class MessageService {
  constructor(private socketService: SocketService){
    socketService.listen(MESSAGE_TYPE.RECEIVE, this.receive )
  }

  public send(msg: string) {
    this.socketService.send({
      type: MESSAGE_TYPE.SEND,
      body: {
        body: msg
      }
    });
  }
  
  private receive(msg: any) {
    debugger;
  }

}