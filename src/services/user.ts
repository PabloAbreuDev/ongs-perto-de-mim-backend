import { CustomError } from "../api/middlewares/error_handler";
import sendMail from "../helpers/mail";
import { IUserDTO } from "../interfaces/user";
import User from "../models/user";
import { hashGenerate } from "../utils/hash";
import { v4 as uuidv4 } from "uuid";
import config from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyRefresh } from "../utils/token";
import Ong from "../models/ong";
import ContactInvite from "../models/contact-invite";
import deleteFile from "../helpers/file-management/delete";
import uploadFile from "../helpers/file-management/upload";

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

  async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("Não há nenhum usuário com esse e-mail!", 400);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new CustomError("Email ou senha inválidos!", 400);
    }

    const token = jwt.sign(
      { user_id: user._id },
      config.jwt.jwt_secret || "12345",
      {
        expiresIn: config.jwt.jwt_expire,
      }
    );

    const refreshToken = jwt.sign(
      { user_id: user._id },
      config.jwt.refresh_secret || "654321",
      {
        expiresIn: config.jwt.refresh_expire,
      }
    );

    return { token, refreshToken };
  }

  async refresh({
    user_id,
    refreshToken,
  }: {
    user_id: string;
    refreshToken: string;
  }) {
    const isValid = verifyRefresh(user_id, refreshToken);
    if (!isValid) {
      throw new CustomError("Token inválido, tente novamente", 400);
    }

    const token = jwt.sign(
      { user_id: user_id },
      config.jwt.jwt_secret || "123456",
      {
        expiresIn: config.jwt.jwt_expire,
      }
    );

    return { token };
  }

  // Envia um convite para que um usuário seja adicionado como contato da ONG
  async inviteToContactOng({
    user_id,
    contact_id,
    ong_id,
  }: {
    user_id: string;
    contact_id: string;
    ong_id: string;
  }) {
    const contato = await User.findById(contact_id);
    if (!contato) {
      throw new CustomError("Contato não encontrado", 400);
    }
    const ong = await Ong.findById(ong_id);

    if (!ong) {
      throw new CustomError("Ong não encontrada", 400);
    }

    if (ong.dono.toString() !== user_id) {
      throw new CustomError(
        "Este usuário não tem autorização para realizar essa tarefa",
        400
      );
    }

    const convite_existe = await ContactInvite.findOne({
      contato: contact_id,
      ong: ong_id,
    });

    if (convite_existe) {
      throw new CustomError("Este convite já existe", 400);
    }

    try {
      // Cria um invite
      await ContactInvite.create({
        contato: contact_id,
        ong: ong_id,
        data: new Date(),
      });
      return { msg: "O convite para o contato foi enviao" };
    } catch (err) {
      throw new CustomError("Não foi possível enviar o contato", 400);
    }
  }

  async acceptInviteToContact({
    user_id,
    invite_id,
  }: {
    user_id: string;
    invite_id: string;
  }) {
    const invite = await ContactInvite.findById(invite_id);
    if (!invite) {
      throw new CustomError("Convite não encontrado", 400);
    }
    if (invite.contato.toString() !== user_id) {
      throw new CustomError("O usuário não pode realizar esta operação", 400);
    }

    const user = await User.findById(user_id);
    if (!user) {
      throw new CustomError("Usuário não encontrado", 400);
    }

    const ong = await Ong.findById(invite.ong);
    if (!ong) {
      throw new CustomError("Ong não encontrada", 400);
    }
    try {
      await Ong.findByIdAndUpdate(ong._id, {
        $push: {
          contatos: user._id,
        },
      });
      // Deleta o convite
      await ContactInvite.findOneAndDelete({
        ong: invite.ong,
        contato: invite.contato,
      });
      // Adiciona a ong ao meu array de ongs
      await User.updateOne(
        { _id: user_id },
        { $push: { ongsParticipo: invite.ong } }
      );
      return { msg: "Solicitação aceita" };
    } catch (err) {
      console.log(err);
      throw new CustomError("Não foi possível aceitar o convite", 400);
    }
  }

  async newProfilePicture({ file, user_id }: { file: any; user_id: string }) {
    // Se já existe apaga
    const user = await User.findById(user_id);
    if (!user) {
      throw new CustomError("Usuário não encontrado", 400);
    }

    try {
      if (user.pictureProfile) {
        deleteFile(user.pictureProfile);
      }
      user.pictureProfile = uploadFile(file);
      await user.save();
      return { msg: "Foto atualizada com sucesso" };
    } catch (err) {
      throw new CustomError("Não foi possível atualizar a foto", 400);
    }
  }
}

export default new UserService();
