import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define o schema de usuários
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Exporta o schema já criando a collection no banco
export default mongoose.model('users', User);