import storeService from "./StoreService";

class LoggerService {

  public log = (message: string) => {
    console.log(message)
  }

  /**
   * 
   */
  public dumpChatInLog = (messageList: any) => {
    storeService.myLogSubscriber = setInterval(() => {
      console.log('message list log: ' + JSON.stringify(messageList));
    }, 5000);
  }

}

const loggerService = new LoggerService();

export default loggerService