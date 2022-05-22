import { CustomError } from "../api/middlewares/error_handler";
import deleteFile from "../helpers/file-management/delete";
import uploadFile from "../helpers/file-management/upload";
import { IOngDTO } from "../interfaces/ong";
import Ong from "../models/ong";

class OngService {
  constructor() {}

  // Cria uma ong
  async create(ong: IOngDTO) {
    try {
      const createOng = await Ong.create(ong);
      return { msg: "Ong criada com sucesso" };
    } catch (err) {
      throw new CustomError("Não foi possível criar a ong", 400);
    }
  }

  // Adiciona foto a uma ong
  async addProfilePhoto({
    id_user,
    id_ong,
    foto,
    descricao,
  }: {
    id_user: string;
    id_ong: string;
    foto: any;
    descricao: string;
  }) {
    const ong = await Ong.findById(id_ong);

    if (!ong) {
      throw new CustomError("Ong não encontrada", 400);
    }

    if (ong.fotosPerfil) {
      if (ong.fotosPerfil.length >= 3) {
        throw new CustomError(
          "Não é possível adicinar mais uma foto de perfil a essa ong",
          400
        );
      }
    }

    if (ong.dono != id_user) {
      throw new CustomError(
        "Este usuário não pode adicionar fotos a essa ONG ",
        400
      );
    }

    try {
      ong.fotosPerfil.push({
        nome: uploadFile(foto),
        descricao: descricao,
      });
      await ong.save();
      return { msg: "Foto da ong adicionada com sucesso" };
    } catch (err) {
      throw new CustomError("Não foi possível adicionar a foto", 400);
    }
  }

  async editProfilePhoto({
    id_user,
    foto,
    descricao,
    id_foto,
    id_ong,
  }: {
    id_user: string;
    foto: any;
    descricao: string;
    id_foto: string;
    id_ong: string;
  }) {
    const ong = await Ong.findById(id_ong);
    if (!ong) {
      throw new CustomError("Ong não encontrada", 400);
    }

    if (ong.dono.toString() !== id_user) {
      throw new CustomError("Este usuário não pode editar esta foto", 400);
    }

    const objIndex = ong.fotosPerfil.findIndex(
      (obj) => obj._id?.toString() === id_foto
    );

    if (objIndex == -1) {
      throw new CustomError("Foto não encontrada", 400);
    }

    try {
      // Atualiza foto
      if (foto) {
        const nomeFoto = ong.fotosPerfil[objIndex].nome;
        ong.fotosPerfil[objIndex].nome = uploadFile(foto);
        deleteFile(nomeFoto);
      }

      // Atualiza descrição
      if (descricao) {
        ong.fotosPerfil[objIndex].descricao = descricao;
      }
      // Salva a ong alterada
      await ong.save();
      return { msg: "Foto da ong editada com sucesso" };
    } catch (err) {
      throw new CustomError("Não foi possível editar essa foto", 400);
    }
  }

  async removeProfilePhoto({
    id_user,
    id_foto,
    id_ong,
  }: {
    id_user: string;
    id_foto: string;
    id_ong: string;
  }) {
    const ong = await Ong.findById(id_ong);
    if (!ong) {
      throw new CustomError("Ong não encontrada", 400);
    }

    if (ong.dono.toString() !== id_user) {
      throw new CustomError("Este usuário não pode editar esta foto", 400);
    }

    const objIndex = ong.fotosPerfil.findIndex(
      (obj) => obj._id?.toString() === id_foto
    );

    if (objIndex == -1) {
      throw new CustomError("Foto não encontrada", 400);
    }

    try {
      const nomeFoto = ong.fotosPerfil[objIndex].nome;
      deleteFile(nomeFoto);

      await Ong.findOneAndUpdate(
        { _id: id_ong },
        { $pull: { fotosPerfil: { _id: id_foto } } }
      );

      await ong.save();
      return { msg: "Foto removida com sucesso" };
    } catch (err) {
      throw new CustomError("Não foi possível remover essa foto", 400);
    }
  }
}

export default new OngService();
