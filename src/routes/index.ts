import express from "express";
import senderRoute from "./senderRoute";

const routes = (app: any) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(senderRoute);
};

export default routes;
