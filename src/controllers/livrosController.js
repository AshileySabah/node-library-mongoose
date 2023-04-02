import livros from "../models/Livro.js";

class LivroController {
  static getAllLivros = async (req, res) => {
    try{
      const livrosResultado = await livros.find().populate("autor").exec();
      res.status(200).json(livrosResultado);
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
    }
  };

  static getLivroById = async (req, res) => {
    try{
      const id = req?.params?.id;
      const livroResultado = await livros.findById(id).populate("autor", "nome").exec();
      res.status(200).send(livroResultado.toJSON());
    }catch(err){
      res.status(400).send({ message: "Livro não existente." });
    }
  };

  static createLivro = async (req, res) => {
    try{
      const livro = new livros(req?.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
    }
  };

  static updateLivro = async (req, res) => {
    try{
      const id = req?.params?.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso." });
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao atualizar livro.` });
    }
  };

  static deleteLivro = async (req, res) => {
    try{
      const id = req?.params?.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro deletado com sucesso." });
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao deletar livro.` });
    }
  };

  static getLivrosByEditora = async (req, res) => {
    try{
      const { editora } = req.query;
      const livrosResultado = await livros.find({ "editora": editora }, {}, );
      res.status(200).json(livrosResultado);
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao encontrar livros.` });
    }
  };
}

export default LivroController;