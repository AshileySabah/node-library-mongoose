import mongoose from "mongoose";

mongoose.connect('mongodb+srv://alura:alura123@alura.hibadzs.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection

export default db;