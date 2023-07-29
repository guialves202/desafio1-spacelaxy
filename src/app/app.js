import express from 'express';
import userRoutes from './routes/user.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import 'dotenv/config';

const app = express();

// Configurações

    // Sessão de usuário
        const store = new session.MemoryStore();
        app.use(session({
            secret: process.env.SESSION_SECRET, // Insira aqui secret string de sua preferência
            resave: false,
            saveUninitialized: false,
            // Define o tempo de sessão para 1 minuto
            cookie: { maxAge: 1 * 60 * 1000 },
            store
        }))
    
    // Flash
        app.use(flash());

    // JSON
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

    // CORS
        app.use(cors());

    // Definindo o __dirname, pois não vem por padrão no ES Modules
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

    // View Engine
        app.set('view engine', 'ejs');
        app.set('views', __dirname + '/views');

    // Mongoose
        mongoose.set('strictQuery', false);
        mongoose.Promise = global.Promise;

        mongoose.connect(process.env.MONGO_URI, { // Insira aqui o caminho para conexão com seu banco MongoDB
            useNewUrlParser: true
        })
        .then(() => {
            console.log('Conectado ao mongodb com sucesso')
        })
        .catch((err) => {
            console.log('Erro ao se conectar ao mongodb: ' + err);
        })

    // Arquivos estáticos
        app.use(express.static(__dirname + '/public'));  

// Rotas

    // Chama todas as rotas referentes a usuário
    app.use('/user', userRoutes);
    
    // Rota principal
    app.get('/', (req, res) => {

        // Define o objeto para renderizar o conteúdo específico de cada página
        let renderObj = {
            content: '../home.ejs',
            cssPath: '/css/home.css',
            error: req.flash('error_msg'),
            success: req.flash('success_msg'),
            session: req.session
        }
        res.render('layouts/main', renderObj);
    })

export default app;