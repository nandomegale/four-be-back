import express, { Request, Response } from "express";
import Client from "./client";
import { sleep } from "./helpers/sleep";
import Sender from "./sender";

const client = new Client();

const sender = new Sender(client);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/status", (req: Request, res: Response) => {
  return res.send({
    qrCode: client.qrCode,
    status: client.status,
  });
});

app.post("/send", async (req: Request, res: Response) => {
  const { numbers, message, delay } = req.body;
  numbers.forEach(async (number: string, index: number) => {
    try {
      const re: RegExp = /\d{10}/g;
      const valido = re.test(number);
      if (valido) {
        await sleep(Number(delay) * 1000 * index);
        await sender.sendText(number, message);
      } else {
        throw Error("número de telefone fora do padrão");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: error });
    }
    if (index === numbers.length - 1) {
      return res
        .status(200)
        .json({ success: true, message: "Mensagens enviadas com sucesso!" });
    }
  });
});

app.post("/sendImage", async (req: Request, res: Response) => {
  const { number, imagePath, imageName, caption } = req.body;
  try {
    await sender.sendImage(number, imagePath, imageName, caption);
    return res
      .status(200)
      .json({ success: true, message: "Imagem enviada com sucesso!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Não foi possível enviar a imagem" });
  }
});

app.post("/testedelay", (req: Request, res: Response) => {
  const { numbers, message, delay } = req.body;

  numbers.forEach(async (number: string, index: number) => {
    await sleep(delay * 1000 * index);
    console.log(number, message, new Date());
    if (index === numbers.length - 1) {
      return res
        .status(200)
        .json({ success: true, message: "Mensagens enviadas com sucesso!" });
    }
  });
});

app.listen(5000, () => {
  console.log("Servidor iniciado");
});
