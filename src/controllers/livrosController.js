import livros from "../models/Livro.js";

class LivroController {
    static getAllLivros = (req, res) => {
        livros.find((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static getLivroById = (req, res) => {
        const { id } = req?.params;
        livros.findById(id, (err, livro) => {
            if(err){
                res.status(400).send({ message: `Livro não existente.` })
            }else{
                res.status(200).send(livro.toJSON())
            }
        })
    }

    static createLivro = (req, res) => {
        const livro = new livros(req?.body)
        livro.save((err) => {
            if(err){
                res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` })
            }else{
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static updateLivro = (req, res) => {
        const { id } = req?.params;
        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if(err){
                res.status(500).send({ message: `${err.message} - falha ao atualizar livro.` })
            }else{
                res.status(200).send({ message: `Livro atualizado com sucesso.` })
            }
        })
    }

    static deleteLivro = (req, res) => {
        const { id } = req?.params;
        livros.findByIdAndDelete(id, (err) => {
            if(err){
                res.status(500).send({ message: `${err.message} - falha ao deletar livro.` })
            }else{
                res.status(200).send({ message: `Livro deletado com sucesso.` })
            }
        })
    }
}

export default LivroController;