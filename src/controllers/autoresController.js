import autores from "../models/Autor.js";

class AutorController {
  static getAllAutores = async (req, res) => {
    try{
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    }catch(err){
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  };

  static getAutorById = async (req, res) => {
    try{
      const id = req?.params?.id;
      const autorResultado = await autores.findById(id);
      res.status(200).send(autorResultado);
    }catch(err){
      res.status(400).send({ message: "Autor não existente." });
    }
   
  };

  static createAutor = async (req, res) => {
    try{
      const autor = new autores(req?.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.` });
    }
  };

  static updateAutor = async (req, res) => {
    try{
      const id = req?.params?.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso." });
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao atualizar autor.` });
    }
  };

  static deleteAutor = async (req, res) => {
    try{
      const id = req?.params?.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor deletado com sucesso." });
    }catch(err){
      res.status(500).send({ message: `${err.message} - falha ao deletar autor.` });
    }
  };
}

export default AutorController;