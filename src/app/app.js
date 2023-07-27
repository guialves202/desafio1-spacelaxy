import express from 'express';
import userRoutes from './routes/user.js';

const app = express();


// Config

    // Variável do caminho do diretório atual
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

    // View Engine
        app.set('view engine', 'ejs');
        app.set('views', __dirname + '/views');

    // Mongoose
    
    // Arquivos estáticos
        app.use(express.static(__dirname + '/public'));

// Rotas
    app.use('/user', userRoutes);

export default app;