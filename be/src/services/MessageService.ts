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
