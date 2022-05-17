import { Router } from "express";
import HomeController from "../controllers/home";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const home = new HomeController();

const route = Router();

export default (app: Router) => {
  app.use("/", route);
  route.get("/", authMiddleware, home.checkStatus);
};
