"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateNewUserService_service_1 = require("../useCases/User/CreateNewUser/CreateNewUserService.service");
const UsersRepository_1 = require("../repositories/Users/UsersRepository");
class UserController {
    async createNewUser(req, res) {
        const { name, email, password, confirmPassword } = req.body;
        const createNewUserService = tsyringe_1.container.resolve(CreateNewUserService_service_1.CreateNewUserService);
        const newUser = await createNewUserService.execute({
            name,
            email,
            password,
            confirmPassword,
        });
        return res.status(201).json({
            success: true,
            item: newUser,
            message: "Usuário cadastrado com sucesso",
        });
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const usersRepository = new UsersRepository_1.UsersRepository();
            const user = await usersRepository.findById(id);
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: "Usuário não encontrado" });
            }
            if (name)
                user.name = name;
            if (email)
                user.email = email;
            if (password)
                user.password = password;
            await usersRepository.model.updateOne({ _id: id }, user);
            return res.status(200).json({
                success: true,
                item: user,
                message: "Usuário atualizado com sucesso",
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao atualizar usuário",
                error: err.message,
            });
        }
    }
}
exports.UserController = UserController;
