import { Request, Response } from "express";
import { IOngDTO } from "../../interfaces/ong";
import OngService from "../../services/ong";

class OngController {
  async create(req: Request, res: Response) {
    const ong: IOngDTO = req.body;
    ong.dono = req.body.user_id;
    const response = await OngService.create(ong);
    return res.status(201).json({ msg: response.msg });
  }

  async addProfilePhoto(req: Request, res: Response) {
    const file = req.file;
    const { descricao, id_ong } = req.body;
    const user_id = req.user.user_id;
    const response = await OngService.addProfilePhoto({
      foto: file,
      descricao,
      id_ong,
      id_user: user_id,
    });
    return res.status(201).json({ msg: response.msg });
  }

  async editProfilePhoto(req: Request, res: Response) {
    const file = req.file;
    const { descricao, id_ong } = req.body;
    const { id } = req.params;
    const user_id = req.user.user_id;
    const response = await OngService.editProfilePhoto({
      id_ong,
      descricao,
      id_user: user_id,
      foto: file,
      id_foto: id,
    });
    return res.status(200).json({ msg: response.msg });
  }

  async removeProfilePhoto(req: Request, res: Response) {
    const { id_foto, id_ong } = req.params;

    const response = await OngService.removeProfilePhoto({
      id_user: req.user.user_id,
      id_foto,
      id_ong,
    });
    return res.status(200).json({ msg: response.msg });
  }
}

export default OngController;
