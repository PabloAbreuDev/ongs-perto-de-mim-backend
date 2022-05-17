import { Request, Response } from "express";
import { IUserDTO } from "../../interfaces/user";
import UserService from "../../services/user";

class UserController {
  async create(req: Request, res: Response) {
    const user: IUserDTO = req.body;
    const response = await UserService.createUser(user);
    return res.status(200).json({ msg: response.msg });
  }

  async verify(req: Request, res: Response) {
    const { id } = req.params;
    const response = await UserService.verify(id);
    return res.render("verify", { response: response });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await UserService.login({ email, password });
    return res.status(200).json(response);
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken, user_id } = req.body
    const response = await UserService.refresh({ user_id, refreshToken })
    return res.status(200).json(response);
  }
}

export default UserController;
