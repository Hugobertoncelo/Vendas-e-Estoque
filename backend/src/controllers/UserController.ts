import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateNewUserService } from "../useCases/User/CreateNewUser/CreateNewUserService.service";
import { UsersRepository } from "../repositories/Users/UsersRepository";
import bcrypt from "bcryptjs";

export class UserController {
  async createNewUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirmPassword } = req.body;

    const createNewUserService = container.resolve(CreateNewUserService);
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

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const usersRepository = new UsersRepository();
      const user = await usersRepository.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuário não encontrado" });
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 8);
      await (usersRepository.model as any).updateOne({ _id: id }, user);
      return res
        .status(200)
        .json({
          success: true,
          item: user,
          message: "Usuário atualizado com sucesso",
        });
    } catch (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Erro ao atualizar usuário",
          error: err.message,
        });
    }
  }
}
