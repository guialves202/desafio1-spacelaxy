import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = Router();

// Rota para renderizar a página de login
router.get('/login', (req, res) => {

    // Define o objeto para renderizar o conteúdo específico de cada página
    let renderObj = {
        content: '../login.ejs',
        cssPath: '/css/form.css',
        error: req.flash('error_msg'),
        success: req.flash('success_msg'),
        session: req.session
    }
    res.render('layouts/main', renderObj);
})

// Rota para renderizar a página de cadastro
router.get('/register', (req, res) => {

    // Define o objeto para renderizar o conteúdo específico de cada página
    let renderObj = {
        content: '../register.ejs',
        cssPath: '/css/form.css',
        error: req.flash('error_msg'),
        success: req.flash('success_msg'),
        session: req.session
    }
    res.render('layouts/main', renderObj);
})

// Fazer o login
router.post('/login', (req, res) => {
    UserController.findUserAndLogin(req, res);
});

// Fazer o cadastro
router.post('/register', (req, res) => {
    UserController.registerOrLogin(req, res);
})

// Deslogar usuário
router.get('/logout', UserController.logout)

export default router;