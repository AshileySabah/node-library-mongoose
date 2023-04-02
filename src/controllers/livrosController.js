import { livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
  static getAllLivros = async (req, res, next) => {
    try{
      const livrosResultado = await livros.find().populate("autor").exec();
      res.status(200).json(livrosResultado);
    }catch(erro){
      next(erro);
    }
  };

  static getLivroById = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroResultado = await livros.findById(id).populate("autor", "nome").exec();
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
      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso." });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static deleteLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro deletado com sucesso." });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static getLivrosByFilter = async (req, res, next) => {
    try{
      const { editora, titulo, minPaginas, maxPaginas } = req.query;
      const filtro = {};

      if(editora) filtro.editora = { $regex: editora, $options: "i" };
      if(titulo) filtro.titulo = { $regex: titulo, $options: "i" };
      if(minPaginas) filtro.numeroPaginas = { $gte: minPaginas };
      if(maxPaginas) filtro.numeroPaginas = { $lte: maxPaginas };

      const livrosResultado = await livros.find(filtro);
      res.status(200).send(livrosResultado);
    }catch(erro){
      next(erro);
    }
  };
}

export default LivroController;