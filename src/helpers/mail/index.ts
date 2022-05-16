import nodemailer from "nodemailer";
import config from "../../config";
import { IMail } from "../../interfaces/mail";
import verifyTemplate from "./templates/verify";

const sendMail = async (mail: IMail) => {
  let transporter = nodemailer.createTransport({
    //@ts-ignore
    host: config.mail.smtp_host,
    port: config.mail.smtp_port,
    secure: false,
    auth: {
      user: config.mail.smtp_user,
      pass: config.mail.smtp_pass,
    },
  });

  switch (mail.type) {
    case "verify":
      await transporter.sendMail({
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        html: verifyTemplate(mail.text),
      });
      break;
    default:
      console.log("defina o tipo de e-mail");
  }
};

export default sendMail;
