import express from "express";
import "reflect-metadata";
import router from "./api/routes";

const createApp = () => {
  const app = express();
  app.use("/", router);
  return app;
};

export default createApp;
