import { body } from "express-validator";

export const createOngValidateRules = () => {
  return [
    body("name")
      .trim()
      .isString()
      .withMessage("Informe o nome da ONG")
      .isLength({ min: 3, max: 30 })
      .withMessage("O nome da ONG deve conter entre 3 e 15 caracteres"),

    body("cep")
      .trim()
      .isString()
      .withMessage("Informe o cep da ONG")
      .isLength({ min: 8, max: 8 })
      .withMessage("O sobrenome deve conter entre 3 e 15 caracteres")
      .isNumeric()
      .withMessage("Informe os digitos do cpf sem ponto ou traço"),

    body("bairro")
      .isString()
      .withMessage("Informe o nome do bairro")
      .isLength({ min: 3, max: 30 })
      .withMessage("O nome do bairro deve ter entre 3 e 30 caracteres"),

    body("rua")
      .isString()
      .withMessage("Informe a rua ")
      .isLength({ min: 3, max: 30 })
      .withMessage("O nome da rua deve ter entre 3 e 30 caracteres"),

    body("numero")
      .if(body("numero").exists())
      .isString()
      .isLength({ min: 1, max: 9 })
      .withMessage("Informe o número correto"),

    body("complemento")
      .trim()
      .if(body("complemento").exists())
      .isLength({ min: 1, max: 15 })
      .withMessage("Informe o número correto")
      .isString()
      .withMessage("Informe um complemento válido"),

    body("cidade")
      .isLength({ min: 3, max: 20 })
      .isString()
      .withMessage("Informe o número do bairro"),

    body("estado")
      .trim()
      .isLength({ min: 2, max: 2 })
      .isString()
      .withMessage("Informe o estado"),

    body("localizacao")
      .if(body("localizacao").exists())
      .isString()
      .isLength({ max: 1000 }),
  ];
};

export const addProfilePhotoValidationRules = () => {
  return [
    body("descricao")
      .if(body("descricao").exists())
      .isString()
      .withMessage("A descrição deve ser uma string")
      .isLength({ min: 1, max: 3000 })
      .withMessage("A descrição deve ter no máximo 3000 caracteres"),

    body("id_ong").isString().withMessage("Informe o ID da ong"),
  ];
};

export const editPrfilePhotoValidationRules = () => {
  return [
    body("descricao")
      .if(body("descricao").exists())
      .isString()
      .withMessage("Informe a descrição como string")
      .isLength({ min: 1, max: 3000 })
      .withMessage("A descrição deve ter no máximo 3000 caracteres"),
  ];
};
