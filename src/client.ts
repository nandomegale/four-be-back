//import { CatchQR, StatusFind, Whatsapp } from "venom-bot";
const venom = require("venom-bot")

class Client {
  public WhatsappClient: any;
  private _status: string;
  private _qrCode: string;

  public get status(): string {
    return this._status;
  }

  public get qrCode(): string {
    return this._qrCode;
  }

  constructor() {
    this.initialize();
  }

  private initialize() {
    const catchQR: any = (qrCode: string) => {
      this._qrCode = qrCode;
    };

    const statusFind: any = (statusGet: string, session: string) => {
      this._status = statusGet;
    };

    const start = (client: any) => {
      this.WhatsappClient = client;
    };

    venom.create("ws-sender", catchQR, statusFind)
      .then((client: any) => start(client))
      .catch((error: any) => console.error(error));
  }
}

export default Client;
