import * as socketio from "socket.io"
import { createServer } from "http"
import * as express from 'express'

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

export class ChatServer {

  public static readonly PORT: number = 1616;
  private messageCache: IChatMessage[] = [];
  private app = express();
  private port: number;
  private server: any;

  constructor() {
    // this.app.use(cors());
    // this.app.options('*', cors());
    this.port = parseInt(process.env.port) || ChatServer.PORT;
    this.server = createServer(this.app)
    this.initSocket()
    this.app.get('/', (req, res) => {
      res.json('hello, world!');
    });
  
    this.listen()
  }
  
  private initSocket = () => {
    const io = socketio(this.server)

    // socket io chat managing
    io.on('connection', (socket: socketio.Socket) => {
      console.log(`user with ${socket.client.id} logged in`)
      io.to(socket.id).emit(MESSAGE_TYPE.LOGIN + '', {
        body: this.messageCache || []
      })

      socket.on(MESSAGE_TYPE.SEND + '', (msg: IChatMessage) => {
        console.log(`message from ${socket.client.id}: ${msg.body}`)
        this.messageCache.push(msg)
        io.emit(MESSAGE_TYPE.RECEIVE + '', msg)
      })

      socket.on(MESSAGE_TYPE.LOGOUT + '', () => {
        console.log(`user with ${socket.client.id} logged out`)
      })
    })

    setInterval(() => {
      console.log('message list log: ' + JSON.stringify(this.messageCache));
    }, 5000)
  }

  private listen = () => {
    // starting up server
    this.server.listen(this.port, () => {
      console.log(`listening on *:${this.port}`);
    })
  };
}
