import Client from "./client";

class Sender {
  constructor(private client: Client) {}

  async sendText(to: string, content: string) {
    //553599123084@c.us
    to = `55${to}@c.us`;
    await this.client.WhatsappClient.sendText(to, content);
  }

  async sendImage(
    to: string,
    imagePath: string,
    imageName: string,
    caption: string
  ) {
    to = `55${to}@c.us`;

    await this.client.WhatsappClient.sendImage(
      to,
      imagePath,
      imageName,
      caption
    )
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        throw Error(err);
      });
  }
}

export default Sender;
