export enum MESSAGE_TYPE {
  'LOGIN' = 'LOGIN', 
  'LOGOUT' = 'LOGOUT', 
  'SEND' = 'SEND',
  'RECEIVE' = 'RECEIVE'
}
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
