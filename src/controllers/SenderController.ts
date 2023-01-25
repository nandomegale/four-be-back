import { Request, Response } from "express";
import { Contact } from "venom-bot";
import { formatNumber } from "../helpers/formatNumber";
import { sleep } from "../helpers/sleep";
import VenomClient from "../VenomClient";

class SenderController {
  static async status(req: Request, res: Response) {
    if (VenomClient.instance) {
      return res.send({
        qrCode: VenomClient.instance.qrCode,
        status: VenomClient.instance.status,
      });
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }

  static async sendMessage(req: Request, res: Response) {
    if (VenomClient.instance) {
      const { number, message } = req.body;
      const to = formatNumber(number);
      // const to = number;

      try {
        await VenomClient.instance.WhatsappClient.sendText(to, message);
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
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }

  static async sendMessageWithDelay(req: Request, res: Response) {
    if (VenomClient.instance) {
      const { numbers, message, delay } = req.body;
      numbers.forEach(async (number: string, index: number) => {
        //let to = formatNumber(number);
        let to = number;
        try {
          await sleep(Number(delay) * 1000 * index);
          await VenomClient.instance.WhatsappClient.sendText(to, message);
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
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }

  static async sendImage(req: Request, res: Response) {
    if (VenomClient.instance) {
      const { number, imagePath, imageName, caption } = req.body;
      const to = formatNumber(number);
      try {
        await VenomClient.instance.WhatsappClient.sendImage(
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
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }

  static async sendImageWithDelay(req: Request, res: Response) {
    if (VenomClient.instance) {
      const { numbers, imagePath, caption, delay } = req.body;

      numbers.forEach(async (number: string, index: number) => {
        let to = formatNumber(number);
        try {
          await sleep(delay * 1000 * index);
          await VenomClient.instance.WhatsappClient.sendImage(
            to,
            imagePath,
            "",
            caption
          );
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
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
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
    if (VenomClient.instance) {
      try {
        const contacts =
          await VenomClient.instance.WhatsappClient.getAllContacts();
        return res.status(200).json({
          success: true,
          data: {
            contacts,
          },
        });
      } catch (err) {
        return res.status(404).json({
          success: false,
          data: {
            error: err,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }

  static async getContactsByName(req: Request, res: Response) {
    if (VenomClient.instance) {
      const { filtername } = req.query;
      try {
        const contacts: Contact[] =
          await VenomClient.instance.WhatsappClient.getAllContacts();

        const filtredContacts: Contact[] = contacts?.filter((contact) => {
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
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }

  static async disconnect(req: Request, res: Response) {
    if (VenomClient.instance) {
      let disconnected = false;
      try {
        disconnected = await VenomClient.instance.WhatsappClient.logout();
        if (disconnected) {
          return res.status(200).json({
            success: true,
            data: {
              message: "Usuário desconectado com sucesso!",
            },
          });
        } else {
          return res.status(500).json({
            success: false,
            data: {
              error: "Não foi possível desconectar",
            },
          });
        }
      } catch (err: any) {
        return res.status(500).json({
          success: false,
          data: {
            error: err.message,
          },
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        data: {
          error: "Whatsapp não iniciado",
        },
      });
    }
  }
}

export default SenderController;
