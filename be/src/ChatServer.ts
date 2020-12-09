import * as socketio from "socket.io"
import * as express from 'express'
import { createServer } from "http"
import loggerService from "./services/LoggerService";
import { IChatMessage, MESSAGE_TYPE, ISocketMessage } from "./services/MessageService";
import storeService from "./services/StoreService";
import { PORT } from "./services/ConstantsService";

export interface IUser {
  socket: string;
  nickname: string;
  color: string;
}

export class ChatServer {

  private app = express();
  private port: number;
  private server: any;
  private userList: { [socketId: string]: IUser;} = {};

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
  
  private generateRandomColor = ():string => {
    return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
  };

  private initSocket = () => {
    const io = socketio(this.server)

    // socket io chat managing
    io.on('connection', (socket: socketio.Socket) => {
      loggerService.log(`user with ${socket.client.id} connected`)
      socket.on(MESSAGE_TYPE.ATTEMPT_LOGIN, (nicknameMessage: ISocketMessage) => {
        loggerService.log(`user with ${socket.client.id} logged in: [${JSON.stringify(nicknameMessage)}]`)
        const newUser = {
          socket: socket.id,
          nickname: nicknameMessage.nickname,
          color: this.generateRandomColor()
        }
        this.userList[socket.id] = newUser
        io.to(socket.id).emit(MESSAGE_TYPE.CONFIRM_LOGIN + '', {
          body: storeService.messageCache || [],
          userData: newUser
        })
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
