import { Router } from "express";
import user from "./routes/user";
import home from "./routes/home";
import ong from "./routes/ong";

export default () => {
  const app = Router();
  home(app);
  user(app);
  ong(app);
  return app;
};
