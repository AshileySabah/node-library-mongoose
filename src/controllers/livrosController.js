import mongoose from "mongoose";
import livros from "../models/Livro.js";

class LivroController {
  static getAllLivros = async (req, res) => {
    try{
      const livrosResultado = await livros.find();
      res.status(200).json(livrosResultado);
    }catch(erro){
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  };

  static getLivroById = async (req, res) => {
    try{
      const id = req.params.id;
      const livroResultado = await livros.findById(id);
      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        res.status(404).send({ message: "Id do Livro não localizado." });
      }
    }catch(erro){
      if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno de servidor." });
      }
    }
  };

  static createLivro = async (req, res) => {
    try{
      const livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    }catch(erro){
      res.status(500).send({ message: `${erro.message} - falha ao cadastrar livro.` });
    }
  };

  static updateLivro = async (req, res) => {
    try{
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso." });
    }catch(erro){
      res.status(500).send({ message: `${erro.message} - falha ao atualizar livro.` });
    }
  };

  static deleteLivro = async (req, res) => {
    try{
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro deletado com sucesso." });
    }catch(erro){
      res.status(500).send({ message: erro.message });
    }
  };

  static getLivrosByEditora = async (req, res) => {
    try{
      const editora = req.query.editora;
      const livrosResultado = await livros.find({ "editora": editora });
      res.status(200).send(livrosResultado);
    }catch(erro){
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}

export default LivroController;