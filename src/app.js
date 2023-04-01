import express from "express";
import db from "./config/dbConnect.js";

db.on('error', console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
    console.log('Conexão com banco feita com sucesso')
})

const app = express();

app.use(express.json())

const livros = [
    { id: 1, titulo: 'Senhor dos Aneis' },
    { id: 2, titulo: 'O Hobbit' },
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node')
})

app.get('/livros', (req, res) => {
    res.status(200).send(livros)
})

app.get('/livros/:id', (req, res) => {
    const { id } = req?.params
    const livro = livros.filter((livro) => {
        return livro?.id === Number(id)
    })
    res.status(200).send(livro)
})

app.post('/livros', (req, res) => {
    const livro = req?.body
    livros?.push(livro)
    res.status(200).send({ message: `O livro ${livro?.titulo} foi cadastrado com sucesso.` })
})

app.put('/livros/:id', (req, res) => {
    const { id } = req?.params
    const { titulo } = req?.body
    const index = livros?.findIndex((livro) => {
        return livro?.id === Number(id)
    })
    const lastTitulo = livros[index]?.titulo;
    livros[index].titulo = titulo;
    res.status(200).send({ message: `O livro ${lastTitulo} foi alterado para ${titulo} com sucesso.` })
})

app.delete('/livros/:id', (req, res) => {
    const { id } = req?.params
    const index = livros?.findIndex((livro) => {
        return livro?.id === Number(id)
    })
    const deletedLivro = livros[index]?.titulo;
    livros?.splice(index, 1)
    res.status(200).send({ message: `O livro ${deletedLivro} foi deletado com sucesso.` })
})

export default app;