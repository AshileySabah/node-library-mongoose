import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static getAllAutores = async (req, res) => {
    try{
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    }catch(erro){
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  };

  static getAutorById = async (req, res) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    }catch(erro){
      if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno de servidor." });
      }
    }
  };

  static createAutor = async (req, res) => {
    try{
      const autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    }catch(erro){
      res.status(500).send({ message: `${erro.message} - falha ao cadastrar autor.` });
    }
  };

  static updateAutor = async (req, res) => {
    try{
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso." });
    }catch(erro){
      res.status(500).send({ message: `${erro.message} - falha ao atualizar autor.` });
    }
  };

  static deleteAutor = async (req, res) => {
    try{
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor deletado com sucesso." });
    }catch(erro){
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AutorController;