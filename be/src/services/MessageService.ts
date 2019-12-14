export enum MESSAGE_TYPE {
  'ATTEMPT_LOGIN' = 'ATTEMPT_LOGIN',
  'CONFIRM_LOGIN' = 'CONFIRM_LOGIN', 
  'LOGOUT' = 'LOGOUT', 
  'SEND' = 'SEND',
  'RECEIVE' = 'RECEIVE'
}
export interface ISocketMessage {
  type: MESSAGE_TYPE;
  body: any;
  sender?: string;
  nickname?: string;
}
export interface IChatMessage extends ISocketMessage {
  body: string;
}
export interface IChatDumpMessage extends ISocketMessage {
  body: IChatMessage[];
}
