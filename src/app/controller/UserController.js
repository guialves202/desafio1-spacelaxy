import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt';

class UserController {

    // Logar usuário
    async login(req, res, user) {

        // Compara a senha do usuário com a informada no formulário
        bcrypt.compare(req.body.password, user.password, (err, isValid) => {
            if(isValid) {
                req.session.authenticated = true;
                req.session.user = user;
                req.flash('success_msg', 'Logado com sucesso');
                res.redirect('/');
            } else {
                req.flash('error_msg', 'Senha incorreta');
                res.redirect('/user/login');
            }
        })
    }

    // Verificar se usuário existe e fazer login
    async findUserAndLogin(req, res) {
        const user = await UserRepository.find(req.body.email);
        if(user) {
            this.login(req, res, user);
        } else {
            req.flash('error_msg', 'Usuário não encontrado');
            res.redirect('/user/login');
        }
    }

    // Fazer login se o usuário já existe, se não, registrar ele
    async registerOrLogin(req, res) {
        const user = await UserRepository.find(req.body.email);
        if(user) {
            this.login(req, res, user);
        } else {
            this.register(req, res);
        }
    }

    // Registrar usuário
    async register(req, res) {

        // Cria um objeto com os dados do formulário
        const formData = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        // Chama a função de salvar um usuário no banco de dados
        const response = await UserRepository.store(formData);

        // Verifica se salvou o usuário
        if(response) {
            req.flash('success_msg', 'Usuário salvo com sucesso');
            res.redirect('/');
        } else {
            req.flash('error_msg', 'Falha ao salvar o usuário');
            res.redirect('/user/register');
        }
    }

    // Deslogar usuário
    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

}

export default new UserController;