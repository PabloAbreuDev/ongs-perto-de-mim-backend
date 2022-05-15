import { Router } from "express";
import home from "./routes/home";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  home(app);
  return app;
};
