import { WebSocket, WebSocketServer } from "ws";
import VenomClient from "./VenomClient";

let sockets: WebSocket[] = [];
const webSocket = (wss: WebSocketServer) => {
  wss.on("connection", (socket: WebSocket) => {
    sockets.push(socket);
    socket.on("message", (msg, isBinary) => {
      const message = JSON.parse(msg.toString());
      if (message == "openws") {
        const status = VenomClient.instance.status;
        sendSocketMsg(`{"status": "${status}"}`);
      } else if (message == "gerarQRCode") {
        VenomClient.instance.initialize();
      }
      //   wss.clients.forEach((s) => {
      //     const message = isBinary ? msg : msg.toString();
      //     s.send(message);
      //   });
    });
  });
};

export const sendSocketMsg = (msg: string) => {
  sockets.forEach((client) => {
    client.send(msg);
  });
};

export default webSocket;
