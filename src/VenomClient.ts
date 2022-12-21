import { Whatsapp, CatchQR, StatusFind } from "venom-bot";
const venom = require("venom-bot");

class VenomClient {
  public WhatsappClient: Whatsapp;
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
    const catchQR: CatchQR = (qrCode: string) => {
      this._qrCode = qrCode;
    };

    const statusFind: StatusFind = (statusGet: string, session: string) => {
      this._status = statusGet;
    };

    const start = (client: Whatsapp) => {
      this.WhatsappClient = client;
    };

    venom
      .create("ws-sender", catchQR, statusFind)
      .then((client: Whatsapp) => start(client))
      .catch((error: Error) => console.error(error));
  }
}

export default VenomClient;
