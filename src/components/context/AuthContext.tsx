import { Dispatch, SetStateAction, createContext } from 'react';

export interface IUser {
  fullName: string | null;
  email: string | null;
  id: string | null;
}

export type AuthContextType = {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
};

export const defaultValue: IUser = {
  fullName: null,
  email: null,
  id: null,
};

export const AuthContext = createContext<AuthContextType | null>(null);
