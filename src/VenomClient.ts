import { CatchQR, SocketState, StatusFind, Whatsapp } from "venom-bot";
import fs from "fs";
import { sendSocketMsg } from "./webSocket";
const venom = require("venom-bot");

class VenomClient {
  static instance: VenomClient;

  public WhatsappClient: Whatsapp;
  private _status: string;
  private _qrCode: string;

  // static getInstance(): VenomClient | null {
  //   if (!VenomClient.instance) {
  //     return null;
  //   }
  //   return VenomClient.instance;
  // }

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
    const catchQR: CatchQR = (base64Qr, asciiQR, attempts, urlCode) => {
      this._qrCode = base64Qr;
      sendSocketMsg(JSON.stringify({ base64Qr }));
      sendSocketMsg(JSON.stringify({ attempts }));

      // para criar um arquivo com o qrcode
      // var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      //   response = { type: "", data: Buffer.from("") };
      // if (matches?.length !== 3) {
      //   return new Error("Invalid input string");
      // }
      // response.type = matches[1];
      // response.data = Buffer.from(matches[2], "base64");

      // var imageBuffer = response;

      // require("fs").writeFile(
      //   "out.png",
      //   imageBuffer["data"],
      //   "binary",
      //   function (err: any) {
      //     if (err != null) {
      //       console.log(err);
      //     }
      //   }
      // );
    };

    const statusFind: StatusFind = (statusGet: string, session: string) => {
      this._status = statusGet;
      sendSocketMsg(JSON.stringify({ statusGet }));
    };

    const start = (client: Whatsapp) => {
      this.WhatsappClient = client;

      //debugger não chega aqui
      //testar deslogando pra ver se chegar
      client.onStateChange((state: SocketState) => {
        console.log(state);
        this.setStatus = state;
      });
    };

    venom
      .create("four-be", catchQR, statusFind, { logQR: false })
      .then((client: Whatsapp) => start(client))
      .catch((error: Error) => console.error(error));
  }
}

export default VenomClient;
