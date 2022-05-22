import { body } from "express-validator";

export const createUserValidateRules = () => {
  return [
    body("firstName")
      .isString()
      .withMessage("Informe o nome")
      .isLength({ min: 3, max: 15 })
      .withMessage("O nome deve conter entre 3 e 15 caracteres"),

    body("lastName")
      .isString()
      .withMessage("Informe o sobrenome")
      .isLength({ min: 3, max: 15 })
      .withMessage("O sobrenome deve conter entre 3 e 15 caracteres"),

    body("email").isEmail().withMessage("Informe um e-mail válido"),

    body("password")
      .isString()
      .withMessage("Informe uma senha")
      .isLength({ min: 3, max: 15 })
      .withMessage("Informe um password que tenha entre 3 r 15 caracteres"),

    body("genero")
      .if(body("genero").exists())
      .isString()
      .withMessage("Escreva uma string"),
  ];
};

export const addContactValidateRules = () => {
  return [
    body("ong_id").isString().withMessage("Informe o ID da ong"),
    body("contact_id").isString().withMessage("Informe o ID do contato"),
  ];
};
