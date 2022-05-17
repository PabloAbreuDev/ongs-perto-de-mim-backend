import { Router } from "express";
import { createUserValidateRules } from "../validators/user";
import UserController from "../controllers/user";
import validate from "../middlewares/validate";

const user = new UserController();

const route = Router();

export default (app: Router) => {
  app.use("/users", route);
  route.post("/", createUserValidateRules(), validate, user.create);
  route.get("/verify/:id", user.verify);
  route.put("/login", user.login)
  route.put("/refresh", user.refresh)
};
