import * as socketio from "socket.io"
import * as express from 'express'
import { createServer } from "http"
import loggerService from "./services/LoggerService";
import { IChatMessage, MESSAGE_TYPE } from "./services/MessageService";
import storeService from "./services/StoreService";
import { PORT } from "./services/ConstantsService";

export class ChatServer {

  private app = express();
  private port: number;
  private server: any;

  constructor() {
    // this.app.use(cors());
    // this.app.options('*', cors());
    this.port = parseInt(process.env.port) || PORT;
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
      loggerService.log(`user with ${socket.client.id} logged in`)
      io.to(socket.id).emit(MESSAGE_TYPE.LOGIN + '', {
        body: storeService.messageCache || []
      })

      socket.on(MESSAGE_TYPE.SEND + '', (msg: IChatMessage) => {
        loggerService.log(`message from ${socket.client.id}: ${msg.body}`)
        storeService.messageCache.push(msg)
        io.emit(MESSAGE_TYPE.RECEIVE + '', msg)
      })

      socket.on(MESSAGE_TYPE.LOGOUT + '', () => {
        loggerService.log(`user with ${socket.client.id} logged out`)
      })
    })
  }

  private listen = () => {
    // starting up server
    this.server.listen(this.port, () => {
      loggerService.log(`listening on :${this.port}`);
    })
  };
}
