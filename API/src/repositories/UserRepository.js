import User from "../models/User.js";

class UserRepository {

    // Registra um novo usuário no banco de dados
    async store(userData) {
        try {
            await new User(userData).save();
            return true
        } catch(err) {
            return false;
        }
    }

    // Busca um usuário por email
    async find(email) {
        try{
            const user = await User.findOne({email: email});
            return user
        } catch(err) {
            return false
        }
    }

}

export default new UserRepository;