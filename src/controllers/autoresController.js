import { autores } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AutorController {
  static getAllAutores = async (req, res, next) => {
    try{
      const autoresResultado = autores.find();
      req.listToPaginate = autoresResultado;
      next();
    }catch(erro){
      next(erro);
    }
  };

  static getAutorById = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static createAutor = async (req, res, next) => {
    try{
      const autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    }catch(erro){
      next(erro);
    }
  };

  static updateAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso." });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static deleteAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorResultado = await autores.findByIdAndDelete(id);
      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor deletado com sucesso." });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };
}

export default AutorController;