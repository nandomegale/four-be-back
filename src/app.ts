import express, { Request, Response } from "express";
import Client from "./client";
import Sender from "./sender";

const client = new Client();

const sender = new Sender(client);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/status", (req: Request, res: Response) => {
  return res.send({
    qrCode: client.qrCode,
    status: client.status
  })
});

app.post("/send", async (req: Request, res: Response) => {
  const { number, message } = req.body;
  try {
    const re: RegExp = /\d{10}/g;
    const valido = re.test(number);
    if (valido) {
      await sender.sendText(number, message);
      return res.status(200).json();
    } else {
      throw Error("número de telefone fora do padrão");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error });
  }
});

app.listen(5000, () => {
  console.log("Servidor iniciado");
});
