import express from "express";
import AutorController from "../controllers/autoresController.js";

const router = express.Router();

router
    .get('/autores', AutorController.getAllAutores)
    .get('/autores/:id', AutorController.getAutorById)
    .post('/autores', AutorController.createAutor)
    .put('/autores/:id', AutorController.updateAutor)
    .delete('/autores/:id', AutorController.deleteAutor)

export default router;