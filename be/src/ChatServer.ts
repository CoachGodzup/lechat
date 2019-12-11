import * as socketio from "socket.io"
import { createServer } from "http"
import * as express from 'express'

export enum MESSAGE_TYPE {'LOGIN', 'LOGOUT', 'SEND', 'RECEIVE'}

export class MESSAGE {
  type: MESSAGE_TYPE;
  body: string;
}

export class ChatServer {

  public static readonly PORT: number = 1616;
  private messageCache: string[] = [];
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
    const io = socketio(this.server)// SocketIO(this.server)

    // socket io chat managing
    io.on('connection', (socket: socketio.Socket) => {
      console.log(`user with ${socket.client.id} logged in`)
      io.to(socket.id).emit('login', {
        messageCache: this.messageCache || []
      })

      socket.on(MESSAGE_TYPE.SEND + '', (msg: MESSAGE) => {
        console.log(`message from ${socket.client.id}: ${msg.body}`)
        this.messageCache.push(msg.body)
        io.emit(MESSAGE_TYPE.RECEIVE + '', msg)
      })

      socket.on('disconnect', () => {
        console.log(`user with ${socket.client.id} logged out`)
      })
    })

  }

  private listen = () => {
    // starting up server
    this.server.listen(this.port, () => {
      console.log(`listening on *:${this.port}`);
    })
  };
}
