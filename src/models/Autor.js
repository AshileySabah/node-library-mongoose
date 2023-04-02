import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: [true, "O nome do(a) autor(a) é obrigatório"] },
    nacionalidade: { type: String , validate: {
      validator: (nacionalidade) => nacionalidade?.length > 3,
      message: "A nacionalidade {VALUE} não existe."
    }},
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;