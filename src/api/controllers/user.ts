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
}

export default UserController;
