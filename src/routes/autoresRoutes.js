import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/autores", AutorController.getAllAutores, paginar)
  .get("/autores/:id", AutorController.getAutorById)
  .post("/autores", AutorController.createAutor)
  .put("/autores/:id", AutorController.updateAutor)
  .delete("/autores/:id", AutorController.deleteAutor);

export default router;