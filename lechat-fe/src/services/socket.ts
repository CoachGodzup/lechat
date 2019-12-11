import io from 'socket.io-client';

const ENDPOINT = 'localhost:1616'

export enum MESSAGE_TYPE {'LOGIN', 'LOGOUT', 'SEND', 'RECEIVE'}
export interface ISocketMessage {
  type: MESSAGE_TYPE;
  body: any;
  sender?: string;
}

export interface IChatMessage extends ISocketMessage {
  body: string;
}

export interface IChatDumpMessage extends ISocketMessage {
  body: IChatMessage[];
}

class SocketService {
  private channelListened: Set<MESSAGE_TYPE> = new Set<MESSAGE_TYPE>();
  private conn: any;

  constructor() {
    this.conn = io.connect(ENDPOINT)
  }

  get id() {
    return this.conn.id
  }

  get socket(){
    return this.conn
  }

  send(message: string) {
    this.conn.emit(MESSAGE_TYPE.SEND, {
      type: MESSAGE_TYPE.SEND,
      body: message,
      sender: this.conn.id
    })
  }

  broadcast(message: string) {
    this.conn.broadcast({
      type: MESSAGE_TYPE.SEND,
      body: message
    })
  }

  listen(channel: MESSAGE_TYPE, listener: (event:ISocketMessage) => void) {
    const output = this.conn.on(channel, listener)
    this.channelListened.add(channel)
    return output
  }

  unregister(channel: MESSAGE_TYPE, listener?:  (event:Event) => {}){
    this.conn.off(channel, listener)
  }

  private unregisterAll() {
    this.channelListened.forEach( channel => this.conn.off(channel))
  }
}

const socketService = new SocketService()

export default socketService