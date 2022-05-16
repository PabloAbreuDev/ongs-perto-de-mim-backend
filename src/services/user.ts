import { CustomError } from "../api/middlewares/error_handler";
import sendMail from "../helpers/mail";
import { IUserDTO } from "../interfaces/user";
import User from "../models/user";
import { hashGenerate } from "../utils/hash";
import { v4 as uuidv4 } from "uuid";
import config from "../config";

class UserService {
  constructor() {}

  async createUser(user: IUserDTO) {
    if (await User.findOne({ email: user.email })) {
      throw new CustomError("Usuário já cadastrado", 400);
    }

    user.password = hashGenerate(user.password);
    user.verifyCode = uuidv4();

    try {
      const createUser = await User.create(user);
      await sendMail({
        from: "Ongs Perto de Mim",
        to: user.email,
        subject: "OPM - Código de verificação",
        text: `${config.base_url}/users/verify/${createUser.verifyCode}`,
        type: "verify",
      });

      return { msg: "Usuário criado corretamente" };
    } catch (err) {
      throw new CustomError("Não foi possível criar o usuário", 400);
    }
  }

  async verify(verifyCode: string) {
    try {
      const user = await User.updateOne(
        { verifyCode },
        { $set: { verified: true, verifyCode: "" } }
      );
      if (user.modifiedCount !== 0) {
        return "Usuário verificado com sucesso";
      }
      return "Não foi possível verificar o usuário";
    } catch (err) {
      return "Não foi possível verificar o usuário";
    }
  }
}

export default new UserService();
