import express, { Request, Response } from "express";
import senderRoute from "./senderRoute";

const routes = (app: any) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/default", (req: Request, res: Response) => {
    return res.status(200).json({ mensagem: "servidor ok!" });
  });
  app.use(senderRoute);
};

export default routes;
