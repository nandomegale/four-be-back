import express from "express";
import routes from "./routes";
import cors from "cors"

const app = express();
app.use(cors());
routes(app);

app.get("/default", (req, res) => {
  return res.status(200).json({ mensagem: "servidor ok!" });
});

app.listen(5000, () => {
  console.log("Servidor iniciado");
});

export default app;
