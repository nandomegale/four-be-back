import express from "express";
import routes from "./routes";

const app = express();

routes(app);

app.listen(5000, () => {
  console.log("Servidor iniciado");
});

export default app;
