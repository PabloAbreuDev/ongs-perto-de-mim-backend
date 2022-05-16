import express from "express";
import cors from "cors";
import config from "../config";
import routes from "../api/";
import handleError from "../api/middlewares/error_handler";
require("express-async-errors");

const expressLoader = ({ app }: { app: express.Application }) => {
  app.set("view engine", "ejs");
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());
  app.use(handleError);
  console.log("Express conectado");
};
export default expressLoader;
