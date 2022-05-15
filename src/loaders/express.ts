import express from "express";
import cors from "cors";
import config from "../config";
import routes from "../api/";

const expressLoader = ({ app }: { app: express.Application }) => {
  // Rotas para checagem
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  // Error handler
  // @ts-ignore
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  // @ts-ignore
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  console.log("Express conectado");
};
export default expressLoader;
