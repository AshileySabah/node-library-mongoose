import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/livros", LivroController.getAllLivros, paginar)
  .get("/livros/filtro", LivroController.getLivrosByFilter, paginar)
  .get("/livros/:id", LivroController.getLivroById)
  .post("/livros", LivroController.createLivro)
  .put("/livros/:id", LivroController.updateLivro)
  .delete("/livros/:id", LivroController.deleteLivro);

export default router;