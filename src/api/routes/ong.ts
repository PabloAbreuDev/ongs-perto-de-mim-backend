import { Router } from "express";
import validate from "../middlewares/validate";
import OngController from "../controllers/ong";
import {
  addProfilePhotoValidationRules,
  createOngValidateRules,
  editPrfilePhotoValidationRules,
} from "../validators/ong";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

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
