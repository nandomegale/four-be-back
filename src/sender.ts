import Client from "./client";

class Sender {
  constructor(private client: Client) {}

  async sendText(to: string, content: string) {
    //553599123084@c.us
    to = `55${to}@c.us`;
    console.log(to);
    await this.client.WhatsappClient.sendText(to, content);
  }
}

export default Sender;
