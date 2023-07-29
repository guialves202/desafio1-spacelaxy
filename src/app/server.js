import app from "./app.js";

// Definindo a porta da aplicação
const PORT = process.env.PORT || 3333;

// Conectar a aplicação na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
})