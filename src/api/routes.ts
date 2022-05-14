import { Router } from "express";
import HomeController from "./controllers/homeController";

const router = Router();
const home = new HomeController();

// Rota de checagem de status
router.get("/", home.checkStatus);

export default router;
