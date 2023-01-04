import { WebSocket, WebSocketServer } from "ws";
import VenomClient from "./VenomClient";

export let venomClient: VenomClient;
let sockets: WebSocket[] = [];
const webSocket = (wss: WebSocketServer) => {
  wss.on("connection", (socket: WebSocket) => {
    sockets.push(socket);
    socket.on("message", (msg, isBinary) => {
      if (msg.toString() == "gerarQRCode") {
        venomClient = new VenomClient();
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
