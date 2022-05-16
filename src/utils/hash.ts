import bcrypt from "bcrypt";

export const hashGenerate = (text: string): string => {
  const hash = bcrypt.hashSync(text, 10);
  return hash;
};
