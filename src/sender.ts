import { CatchQR, create, StatusFind, Whatsapp } from "venom-bot";

class Sender {
  private client: Whatsapp;

  constructor() {
    this.initialize();
  }

  async sendText(to: string, content: string) {
    //553599123084@c.us
    this.client.sendText(to, content);
  }

  private initialize() {
    const qr: CatchQR = (
      qrCode: string,
      asciiQR: string,
      attempt: number
    ) => {};

    const status: StatusFind = (statusGet: string, session: string) => {};

    const start = (client: Whatsapp) => {
      this.client = client;
      this.sendText(
        "553599123084@c.us",
        "Olá, essa é uma mensagem enviada pelo robô"
      );
    };

    create("ws-sender", qr, status)
      .then((client) => start(client))
      .catch((error) => console.error(error));
  }
}

export default Sender;
