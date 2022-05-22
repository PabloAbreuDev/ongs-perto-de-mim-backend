export interface IOng {
  dono: string;
  name: string;
  cep: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  fotosPerfil: IFoto[];
}

export interface IFoto {
  _id?: string;
  nome: string;
  descricao: string;
}

export interface IOngDTO {
  dono?: string;
  name?: string;
  cep?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
}
