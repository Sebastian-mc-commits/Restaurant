export interface UserCredentialsTypes {
  email: string;
  password: string;
}

export interface User extends UserCredentialsTypes {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
}
