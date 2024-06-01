import { User } from "firebase/auth";

export interface IMainLayoutProps {
  user: User;
  country: string;
  setCountry: (al: string) => void;
}
