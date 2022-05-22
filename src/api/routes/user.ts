import { Router } from "express";
import {
  addContactValidateRules,
  createUserValidateRules,
} from "../validators/user";
import UserController from "../controllers/user";
import validate from "../middlewares/validate";
import authMiddleware from "../middlewares/authMiddleware";

const user = new UserController();

const route = Router();

export default (app: Router) => {
  app.use("/users", route);
  route.post(
    "/",
    authMiddleware,
    createUserValidateRules(),
    validate,
    user.create
  );
  route.get("/verify/:id", user.verify);
  route.put("/login", user.login);
  route.put("/refresh", user.refresh);
  route.post(
    "/contact",
    authMiddleware,
    addContactValidateRules(),
    validate,
    user.addContact
  );
  route.put("/contact/:invite_id", authMiddleware, user.acceptContactInvite);
};
