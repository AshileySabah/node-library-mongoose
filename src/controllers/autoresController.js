import autores from "../models/Autor.js";

class AutorController {
  static getAllAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static getAutorById = (req, res) => {
    const { id } = req?.params;
    autores.findById(id, (err, autor) => {
      if(err){
        res.status(400).send({ message: "Autor não existente." });
      }else{
        res.status(200).send(autor.toJSON());
      }
    });
  };

  static createAutor = (req, res) => {
    const autor = new autores(req?.body);
    autor.save((err) => {
      if(err){
        res.status(500).send({ message: `${err.message} - falha ao cadastrar autor.` });
      }else{
        res.status(201).send(autor.toJSON());
      }
    });
  };

  static updateAutor = (req, res) => {
    const { id } = req?.params;
    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if(err){
        res.status(500).send({ message: `${err.message} - falha ao atualizar autor.` });
      }else{
        res.status(200).send({ message: "Autor atualizado com sucesso." });
      }
    });
  };

  static deleteAutor = (req, res) => {
    const { id } = req?.params;
    autores.findByIdAndDelete(id, (err) => {
      if(err){
        res.status(500).send({ message: `${err.message} - falha ao deletar autor.` });
      }else{
        res.status(200).send({ message: "Autor deletado com sucesso." });
      }
    });
  };
}

export default AutorController;