import { Router } from "express";
import validate from "../middlewares/validate";
import OngController from "../controllers/ong";
import {
  addProfilePhotoValidationRules,
  createOngValidateRules,
  editPrfilePhotoValidationRules,
} from "../validators/ong";
import authMiddleware from "../middlewares/authMiddleware";
import { upload } from "../../helpers/file-management/multer";

const router = Router();

const controller = new OngController();

const route = Router();

export default (app: Router) => {
  app.use("/ongs", route);

  route.post("/", createOngValidateRules(), validate, controller.create);

  route.post(
    "/profile_photo",
    authMiddleware,
    upload.single("upload"),
    addProfilePhotoValidationRules(),
    validate,
    controller.addProfilePhoto
  );

  route.put(
    "/profile_photo/:id",
    authMiddleware,
    editPrfilePhotoValidationRules(),
    validate,
    upload.single("upload"),
    controller.editProfilePhoto
  );

  route.delete(
    "/:id_ong/profile_photo/:id_foto",
    authMiddleware,
    controller.removeProfilePhoto
  );
};
