import { CustomError } from "../api/middlewares/error_handler";
import sendMail from "../helpers/mail";
import { IUserDTO } from "../interfaces/user";
import User from "../models/user";
import { hashGenerate } from "../utils/hash";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyRefresh } from "../utils/token";

class UserService {
  constructor() { }

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

  async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("Não há nenhum usuário com esse e-mail!", 400);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new CustomError("Email ou senha inválidos!", 400,);
    }


    const token = jwt.sign(
      { user_id: user._id },
      config.jwt_secret || "12345",
      {
        expiresIn: config.jwt_expire,
      }
    );

    const refreshToken = jwt.sign({ user_id: user._id }, config.refresh_secret || "654321", {
      expiresIn: config.refresh_expire,
    });

    return { token, refreshToken };
  }

  async refresh({ user_id, refreshToken }: { user_id: string, refreshToken: string }) {
    const isValid = verifyRefresh(user_id, refreshToken);
    if (!isValid) {
      throw new CustomError("Token inválido, tente novamente", 400)
    }

    const token = jwt.sign(
      { user_id: user_id },
      config.jwt_secret || "123456",
      {
        expiresIn: config.jwt_expire,
      }
    );

    return { token }

  }
}

export default new UserService();
