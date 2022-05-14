import createApp from "./app";
import config from "./config";

const app = createApp();

app.listen(config.port, () => {
  console.log(`Aplicação rodando na porta ${config.port}`);
  // TODO: Loaders
});
