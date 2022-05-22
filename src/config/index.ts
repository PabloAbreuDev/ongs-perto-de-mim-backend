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
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire: process.env.JWT_EXPIRE,
  refresh_secret: process.env.REFRESH_SECRET,
  refresh_expire: process.env.REFRESH_EXPIRE,
  aws_access_key_id: process.env.AWS_SECRET_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_region: process.env.AWS_REGION,
  aws_s3_bucket: process.env.AWS_S3_BUCKET,
};
