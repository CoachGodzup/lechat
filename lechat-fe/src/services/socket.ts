import io from 'socket.io-client';

const ENDPOINT = 'localhost:1616'

export enum MESSAGE_TYPE {'LOGIN', 'LOGOUT', 'SEND', 'RECEIVE'}
export interface ISocketMessage {
  type: MESSAGE_TYPE,
  body: object
}

export class SocketService {

  private channelListened: Set<MESSAGE_TYPE> = new Set<MESSAGE_TYPE>();

  constructor(private conn:any) {
    conn = io.connect(ENDPOINT)
  }

  get socket(){
    return this.conn
  }

  send(message: ISocketMessage) {
    this.conn.emit(message)
  }

  broadcast(message: ISocketMessage) {
    this.conn.broadcast(message)
  }

  listen(channel: MESSAGE_TYPE, listener: (event:Event) => void) {
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
