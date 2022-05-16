import { Router } from "express";
import user from "./routes/user";
import home from "./routes/home";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  home(app);
  user(app);
  return app;
};
