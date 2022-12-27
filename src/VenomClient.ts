import { Whatsapp, CatchQR, StatusFind, SocketState } from "venom-bot";
const fs = require("fs");
const venom = require("venom-bot");

class VenomClient {
  public WhatsappClient: Whatsapp;
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
    this.initialize();
  }

  private initialize() {
    const catchQR: CatchQR = (base64Qr, asciiQR, attempts, urlCode) => {
      this._qrCode = base64Qr;

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
    };

    const start = (client: Whatsapp) => {
      this.WhatsappClient = client;

      client.onStateChange((state: SocketState) => {
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
