export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyCode?: string;
  verified?: boolean;
}

export interface IUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyCode?: string;
}
