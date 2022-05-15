import config from "./config";
import express from "express";
import modulesStarter from "./loaders";
import "reflect-metadata";

// Criando o app
const app = express();

app.listen(config.port, async () => {
  await modulesStarter({ app });
  console.log(`Aplicação rodando na porta ${config.port}`);
});
