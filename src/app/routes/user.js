import { Router } from "express";

const router = Router();

router.get('/login', (req, res) => {
    res.send('rota de login')
})

router.get('/register', (req, res) => {
    res.send('rota de register')
})



export default router;