import cors from "cors";
import express from "express";
import http from "http";
import WebSocket from "ws";
import routes from "./routes";
import webSocket from "./webSocket";

const app = express();
app.use(cors());
routes(app);

const server = http.createServer(app);

const wss: WebSocket.Server<WebSocket.WebSocket> = new WebSocket.Server({
  server: server,
});

webSocket(wss);

server.listen(5000, () => {
  console.log("Servidor iniciado");
});

export default server;
