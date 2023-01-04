import { Request, Response } from "express";
import { Contact } from "venom-bot";
import { formatNumber } from "../helpers/formatNumber";
import { sleep } from "../helpers/sleep";
import { venomClient } from "../webSocket";

class SenderController {
  static async status(req: Request, res: Response) {
    return res.send({
      qrCode: venomClient.qrCode,
      status: venomClient.status,
    });
  }

  static async sendMessage(req: Request, res: Response) {
    const { number, message } = req.body;
    const to = formatNumber(number);
    // const to = number;

    try {
      await venomClient.WhatsappClient.sendText(to, message);
      return res.status(200).json({
        success: true,
        data: {
          to,
          message,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          to,
          message,
        },
        error: err,
      });
    }
  }

  static async sendMessageWithDelay(req: Request, res: Response) {
    const { numbers, message, delay } = req.body;
    numbers.forEach(async (number: string, index: number) => {
      //let to = formatNumber(number);
      let to = number;
      try {
        await sleep(Number(delay) * 1000 * index);
        await venomClient.WhatsappClient.sendText(to, message);
        if (index === numbers.length - 1) {
          return res.status(200).json({
            success: true,
            data: {
              numbers,
              message,
              delay,
            },
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          data: {
            numbers,
            message,
            delay,
          },
        });
      }
    });
  }

  static async sendImage(req: Request, res: Response) {
    const { number, imagePath, imageName, caption } = req.body;
    const to = formatNumber(number);
    try {
      await venomClient.WhatsappClient.sendImage(
        to,
        imagePath,
        imageName,
        caption
      );
      return res.status(200).json({
        success: true,
        data: {
          to,
          imagePath,
          imageName,
          caption,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        data: {
          error: err,
        },
      });
    }
  }

  static async sendImageWithDelay(req: Request, res: Response) {
    const { numbers, imagePath, caption, delay } = req.body;

    numbers.forEach(async (number: string, index: number) => {
      let to = formatNumber(number);
      try {
        await sleep(delay * 1000 * index);
        await venomClient.WhatsappClient.sendImage(to, imagePath, "", caption);
        if (index === numbers.length - 1) {
          return res.status(200).json({
            success: true,
            data: {
              numbers,
              imagePath,
              caption,
              delay,
            },
          });
        }
      } catch (err) {
        return res.status(500).json({
          success: false,
          data: {
            error: err,
          },
        });
      }
    });
  }

  static async testDelay(req: Request, res: Response) {
    const { numbers, message, delay } = req.body;

    try {
      numbers.forEach(async (number: string, index: number) => {
        await sleep(delay * 1000 * index);
        console.log(number, message, new Date());
        if (index === numbers.length - 1) {
          return res.status(200).json({
            success: true,
            data: {
              numbers,
              message,
              delay,
            },
          });
        }
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        data: {
          error: err,
        },
      });
    }
  }

  static async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await venomClient.WhatsappClient.getAllContacts();
      return res.status(200).json({
        success: true,
        data: {
          contacts,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        data: {
          error: err,
        },
      });
    }
  }

  static async getContactsByName(req: Request, res: Response) {
    const { filtername } = req.query;
    try {
      const contacts: Contact[] =
        await venomClient.WhatsappClient.getAllContacts();
      const filtredContacts: Contact[] = contacts.filter((contact) => {
        return contact.name?.includes(String(filtername));
      });
      return res.status(200).json({
        success: true,
        data: {
          filtredContacts,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        data: {
          error: err,
        },
      });
    }
  }

  // static async startConnection(req: Request, res: Response) {
  //   venomClient = new VenomClient();
  //   const status = venomClient.status;
  //   if (status == "connected") {
  //     //return res.status(200).json({ status });
  //   }
  // }
}

export default SenderController;
