// import { CatchQR, SocketState, StatusFind, Whatsapp } from "venom-bot";
import { sendSocketMsg } from "./webSocket";
import * as venom from "venom-bot";

class VenomClient {
  static instance: VenomClient;

  public WhatsappClient: venom.Whatsapp;
  private _status: string;
  private _qrCode: string;

  public get status(): string {
    return this._status;
  }

  public set setStatus(value: any) {
    this._status = value;
  }

  public get qrCode(): string {
    return this._qrCode;
  }

  constructor() {
    if (VenomClient.instance) {
      return VenomClient.instance;
    }
    VenomClient.instance = this;
    this.initialize();
  }

  private initialize() {
    const catchQR: venom.CatchQR = (base64Qr, asciiQR, attempts, urlCode) => {
      this._qrCode = base64Qr;
      sendSocketMsg(JSON.stringify({ base64Qr }));
      sendSocketMsg(JSON.stringify({ attempts }));
    };

    const statusFind: venom.StatusFind = (
      statusGet: string,
      session: string
    ) => {
      this._status = statusGet;
      console.log(statusGet);
      sendSocketMsg(JSON.stringify({ statusGet }));
    };

    const start = (client: venom.Whatsapp) => {
      this.WhatsappClient = client;

      //debugger não chega aqui
      //testar deslogando pra ver se chegar
      client.onStateChange((state: venom.SocketState) => {
        console.log(state);
        this.setStatus = state;
      });
    };

    const createOption: venom.CreateOptions = {
      session: "four-bee",
      catchQR,
      statusFind,
      logQR: false,
      multidevice: false,
    };

    venom
      .create(createOption)
      .then((client: venom.Whatsapp) => start(client))
      .catch((error: Error) => console.error(error));
  }
}

export default VenomClient;
