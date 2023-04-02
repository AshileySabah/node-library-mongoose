import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.getAllLivros)
  .get("/livros/busca", LivroController.getLivrosByEditora)
  .get("/livros/:id", LivroController.getLivroById)
  .post("/livros", LivroController.createLivro)
  .put("/livros/:id", LivroController.updateLivro)
  .delete("/livros/:id", LivroController.deleteLivro);

export default router;