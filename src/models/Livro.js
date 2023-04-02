import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O autor é obrigatório"] },
    editora: { type: String, required: [true, "A editora é obrigatória"], enum: { values: ["A Casa do Código", "Qualquer"], message: "A editora {VALUE} não é válida." } },
    numeroPaginas: { type: Number, min: [10, "O número mínimo de páginas é 10"], max: [5000, "O número máximo de páginas é 5000"] },
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;