import "dotenv/config.js";
import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com banco feita com sucesso");
});

const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});

export default app;