import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Arquivo de environment não encontrado");
}

export default {
  port: process.env.PORT,
};
