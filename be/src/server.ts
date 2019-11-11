// https://medium.com/@rossbulat/typescript-live-chat-express-and-socket-io-server-setup-8d24fe13d00

import { ChatServer } from './ChatServer';

let app = new ChatServer();

export { app };