import * as socketio from "socket.io"
import { createServer } from "http"
import * as express from 'express'

export class ChatServer {

  public static readonly PORT: number = 3000;
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

      socket.on('message', (msg) => {
        console.log(`message from ${socket.client.id}: ${msg}`)
        io.emit('message', msg)
        this.messageCache.push(msg)
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
