import { IChatMessage } from "./MessageService";

class StoreService {
  private _myLogSubscriber: any;
  private _messageCache: IChatMessage[] = [];

  public set myLogSubscriber(subscriber: any) {
    this.myLogSubscriber = subscriber
  }

  public get messageCache():IChatMessage[] {
    return this._messageCache
  }
}

const storeService = new StoreService()

export default storeService