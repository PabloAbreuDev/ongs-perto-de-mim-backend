import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Arquivo de environment não encontrado");
}

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  base_url: process.env.BASE_URL,
  api: {
    prefix: "/api",
  },
  mail: {
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS,
  },
};
