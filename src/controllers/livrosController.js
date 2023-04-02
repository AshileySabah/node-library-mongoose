import livros from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
  static getAllLivros = async (req, res, next) => {
    try{
      const livrosResultado = await livros.find();
      res.status(200).json(livrosResultado);
    }catch(erro){
      next(erro);
    }
  };

  static getLivroById = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroResultado = await livros.findById(id);
      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static createLivro = async (req, res, next) => {
    try{
      const livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    }catch(erro){
      next(erro);
    }
  };

  static updateLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso." });
    }catch(erro){
      next(erro);
    }
  };

  static deleteLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro deletado com sucesso." });
    }catch(erro){
      next(erro);
    }
  };

  static getLivrosByEditora = async (req, res, next) => {
    try{
      const editora = req.query.editora;
      const livrosResultado = await livros.find({ "editora": editora });
      res.status(200).send(livrosResultado);
    }catch(erro){
      next(erro);
    }
  };
}

export default LivroController;