import { model, Schema } from "mongoose";
import { IOng } from "../interfaces/ong";

const ongSchema = new Schema<IOng>({
  dono: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  cep: { type: String, required: true },
  bairro: { type: String, required: true },
  rua: { type: String, required: true },
  numero: { type: String },
  complemento: { type: String },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  fotosPerfil: [{ nome: String, descricao: String }],
  contatos: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  localizacao: { type: String },
});

const Ong = model<IOng>("Ong", ongSchema);

export default Ong;
