export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyCode?: string;
  verified?: boolean;
  ongsParticipo: string[];
}

export interface IUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyCode?: string;
  ongsParticipo?: string[];
}
